import {
    Controller,
    Get,
    InternalServerErrorException,
    Query,
    Post,
    UseGuards,
    Body,
    Delete,
    Param,
    ParseIntPipe,
    Patch,
    Request,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
    SuccessResponse,
    ErrorResponse,
} from '../../common/helpers/api.response';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { DatabaseService } from '../../common/services/database.service';

import { Category } from './entity/category.entity';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import {
    PermissionResources,
    PermissionActions,
} from 'src/modules/role/role.constants';
import { HttpStatus } from 'src/common/constants';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';

import { CategoryService } from './services/category.service';
import {
    CategoryListQueryStringSchema,
    CategoryListQueryStringDto,
    CreateCategorySchema,
    CreateCategoryDto,
    UpdateCategorySchema,
    UpdateCategoryDto,
} from './dto/category.dto';

@Controller({
    path: 'category',
})
@UseGuards(JwtGuard, AuthorizationGuard)
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly databaseService: DatabaseService,
        private readonly i18n: I18nRequestScopeService,
    ) {}

    @Get()
    @Permissions([
        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.READ}`,
    ])
    async getCategories(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(CategoryListQueryStringSchema),
        )
        query: CategoryListQueryStringDto,
    ) {
        try {
            const categoryList = await this.categoryService.getCategoryList(
                query,
            );
            return new SuccessResponse(categoryList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([
        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.READ}`,
    ])
    async getCategory(@Param('id', ParseIntPipe) id: number) {
        try {
            const category = await this.categoryService.getCategoryDetail(id);
            if (!category) {
                const message = await this.i18n.translate(
                    'category.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(category);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Permissions([
        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.CREATE}`,
    ])
    async create(
        @Request() req,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateCategorySchema))
        body: CreateCategoryDto,
    ) {
        try {
            body.createdBy = req.loginUser.id;
            const newCategory = await this.categoryService.createCategory(body);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: {},
                newValue: { ...newCategory },
            });
            return new SuccessResponse(newCategory);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Permissions([
        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.UPDATE}`,
    ])
    async updateCategory(
        @Request() req,
        @Param('id') id: number,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(UpdateCategorySchema))
        body: UpdateCategoryDto,
    ) {
        try {
            const oldCategory = await this.databaseService.getDataById(
                Category,
                id,
            );
            if (!oldCategory) {
                const message = await this.i18n.translate(
                    'category.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            body.updatedBy = req.loginUser.id;
            const updatedCategory = await this.categoryService.updateCategory(
                id,
                body,
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldCategory },
                newValue: { ...updatedCategory },
            });
            return new SuccessResponse(updatedCategory);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    @Permissions([
        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.DELETE}`,
    ])
    async deleteCategory(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const oldCategory = await this.databaseService.getDataById(
                Category,
                id,
            );
            if (!oldCategory) {
                const message = await this.i18n.translate(
                    'category.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }

            await this.categoryService.deleteCategory(id, req.loginUser.id);
            const message = await this.i18n.translate(
                'category.message.success.delete',
            );

            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldCategory },
                newValue: {},
            });
            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
