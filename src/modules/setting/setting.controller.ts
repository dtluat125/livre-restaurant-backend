import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { JwtGuard } from '../../common/guards/jwt.guard';
import {
    GeneralSettingDto,
    settingQueryStringSchema,
    settingSchema,
    GeneralSettingValueDto,
} from './dto/request/general-setting.dto';
import { SettingService } from './services/setting.service';
import { SettingKey } from './setting.constant';
import { GeneralSettingListQueryStringDto } from './dto/request/general-setting.dto';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { PermissionActions, PermissionResources } from '../role/role.constants';
import { HttpStatus } from 'src/common/constants';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';

@Controller('/setting')
@UseGuards(JwtGuard, AuthorizationGuard)
export class SettingController {
    constructor(
        private readonly settingService: SettingService,
        private readonly i18n: I18nRequestScopeService,
    ) {}

    @Get('/')
    @Permissions([`${PermissionResources.USER}_${PermissionActions.READ}`])
    async getSetting(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(settingQueryStringSchema),
        )
        query: GeneralSettingListQueryStringDto,
    ) {
        try {
            const setting = await this.settingService.getSettingByKey(
                query.key,
            );

            return new SuccessResponse(setting);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('/')
    @Permissions([`${PermissionResources.USER}_${PermissionActions.UPDATE}`])
    async saveSetting(
        @Body(new TrimObjectPipe(), new JoiValidationPipe(settingSchema))
        data: GeneralSettingDto<GeneralSettingValueDto>,
    ) {
        try {
            if (data.key == SettingKey.USER_POSITION) {
                // check is new userPosition valid
                const isValid = await this.settingService.validateUserPosition(
                    data,
                );
                if (!isValid) {
                    const message = await this.i18n.t('user.position.invalid');
                    return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                        {
                            key: 'values',
                            errorCode: HttpStatus.ITEM_IS_USING,
                            message: message,
                        },
                    ]);
                }
            }
            const savedSetting = await this.settingService.saveSetting(data);
            return new SuccessResponse(savedSetting);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
