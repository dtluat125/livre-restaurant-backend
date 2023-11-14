import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { GlobalDataService } from '../common/services/global-data.service';
import { SettingService } from './services/setting.service';
import { SettingController } from './setting.controller';
import { UserService } from '../user/services/user.service';

@Module({
    controllers: [SettingController],
    providers: [
        SettingService,
        DatabaseService,
        GlobalDataService,
        UserService,
    ],
})
export class SettingModule {}
