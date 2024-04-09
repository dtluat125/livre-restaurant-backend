import { UserRole } from '../../src/modules/user/user.constant';
import { UserStatus } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
import { Role } from 'src/modules/role/entity/role.entity';
dotenv.config();
export class SeedingUser1720963593400 implements MigrationInterface {
    tableName = TABLE_NAME.Users;

    public async up(queryRunner: QueryRunner): Promise<void> {
        const role = (await queryRunner.manager
            .getRepository('roles')
            .findOne({ where: { name: UserRole.SUPERVISOR } })) as Role;
        const userDefault = {
            fullName: 'TTLab Admin',
            email: 'tims@gmail.com',
            password: bcrypt.hashSync('ttlab@1234', bcrypt.genSaltSync(10)),
            status: UserStatus.ACTIVE,
            roleId: role.id,
            position: 'Waiter',
        };
        const items = [
            {
                ...userDefault,
                id: 1,
                fullName: 'TTLab Admin',
                email: 'dtluat.125@gmail.com',
                isSuperAdmin: 1,
            },
            {
                ...userDefault,
                id: 2,
                fullName: 'Luat DT',
                email: 'yanagi.kujou.2002@gmail.com',
            },
        ];

        await queryRunner.manager.getRepository(this.tableName).insert(items);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(this.tableName).delete({
            email: In(['tims@gmail.com', 'ledth@gmail.com']),
        });
    }
}
