import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    Request,
    Delete,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation.pipe';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { DatabaseService } from 'src/common/services/database.service';
import {
    ErrorResponse,
    SuccessResponse,
} from 'src/common/helpers/api.response';
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
import {
    CreateFoodDto,
    CreateFoodSchema,
    FoodListQueryStringSchema,
    FoodQueryStringDto,
    UpdateFoodDto,
    UpdateFoodSchema,
} from './dto/food.dto';
import { Food } from './entity/food.entity';
import { FoodService } from './service/food.service';

@Controller('food')
@UseGuards(JwtGuard, AuthorizationGuard)
export class FoodController {
    constructor(
        private readonly foodService: FoodService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get()
    @Permissions([`${PermissionResources.MENU_FOOD}_${PermissionActions.READ}`])
    async getFoods(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(FoodListQueryStringSchema),
        )
        query: FoodQueryStringDto,
    ) {
        try {
            const foodList = await this.foodService.getFoodList(query);
            return new SuccessResponse(foodList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([`${PermissionResources.MENU_FOOD}_${PermissionActions.READ}`])
    async getFood(@Param('id', ParseIntPipe) id: number) {
        try {
            const food = await this.foodService.getFoodDetail(id);
            if (!food) {
                const message = await this.i18n.translate(
                    'food.message.foodNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(food);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Permissions([
        `${PermissionResources.MENU_FOOD}_${PermissionActions.CREATE}`,
    ])
    async createFood(
        @Request() req,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateFoodSchema))
        body: CreateFoodDto,
    ) {
        try {
            body.createdBy = req.loginUser.id;
            const newFood = await this.foodService.createFood(body);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: {},
                newValue: { ...newFood },
            });
            return new SuccessResponse(newFood);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Permissions([
        `${PermissionResources.MENU_FOOD}_${PermissionActions.UPDATE}`,
    ])
    async updateFoodStatus(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(UpdateFoodSchema))
        body: UpdateFoodDto,
    ) {
        try {
            const oldFood = await this.databaseService.getDataById(Food, id);
            if (!oldFood) {
                const message = await this.i18n.translate(
                    'food.message.foodNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            const food = await this.foodService.updateFoodStatus(id, body);
            const newValue = await this.databaseService.getDataById(Food, id);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldFood },
                newValue: { ...newValue },
            });
            return new SuccessResponse(food);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    @Permissions([
        `${PermissionResources.MENU_FOOD}_${PermissionActions.DELETE}`,
    ])
    async deleteFood(@Request() req, @Param('id', ParseIntPipe) id: number) {
        try {
            const oldFood = await this.databaseService.getDataById(Food, id);
            if (!oldFood) {
                const message = await this.i18n.translate(
                    'food.message.foodNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            await this.foodService.deleteFood(id, req.loginUser.id);

            const message = await this.i18n.translate(
                'food.message.deleteSuccess',
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldFood },
                newValue: {},
            });
            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
