import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService, DatabaseService],
    exports: [RoleService],
})
export class RoleModule {}
