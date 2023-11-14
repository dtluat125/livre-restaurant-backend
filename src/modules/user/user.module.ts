import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
    imports: [AuthModule, RoleModule],
    controllers: [UserController],
    providers: [UserService, DatabaseService],
    exports: [UserService],
})
export class UserModule {}
