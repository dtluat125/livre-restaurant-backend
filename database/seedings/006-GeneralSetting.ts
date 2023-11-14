import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
import { SettingKey } from '../../src/modules/setting/setting.constant';
dotenv.config();

export class UserGeneralSetting1724329509104 implements MigrationInterface {
    name?: string;
    tableName = TABLE_NAME.GeneralSettings;
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(this.tableName).insert([
            {
                key: SettingKey.USER_POSITION,
                values: [
                    {
                        code: 'SHIFT_LEADER',
                        value: {
                            en: 'Shift Leader',
                            vi: 'Trưởng ca',
                        },
                    },
                    {
                        code: 'CASHIER',
                        value: {
                            en: 'Cashier',
                            vi: 'Thu ngân',
                        },
                    },
                    {
                        code: 'CHEF',
                        value: {
                            en: 'Chef',
                            vi: 'Đầu bếp',
                        },
                    },
                    {
                        code: 'WAITER',
                        value: {
                            en: 'Waiter',
                            vi: 'Bồi bàn',
                        },
                    },
                ],
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(this.tableName).delete({});
    }
}
