import { UserRole } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { TABLE_NAME } from '../constant';

export class SeedingRole1720963593399 implements MigrationInterface {
    tableName = TABLE_NAME.Roles;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            const roleSupervisor = {
                name: UserRole.SUPERVISOR,
                description: 'This is description of supervisor role!',
                createdBy: 1,
            };
            const roleEmployee = {
                name: UserRole.USER,
                description: 'This is description of user role!',
                createdBy: 1,
            };
            await queryRunner.manager
                .getRepository(this.tableName)
                .insert([roleSupervisor, roleEmployee]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            await queryRunner.manager
                .getRepository(this.tableName)
                .delete({ name: In(Object.values(UserRole)) });
        }
    }
}
