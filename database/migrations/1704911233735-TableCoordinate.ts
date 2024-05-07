import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCoordinate1704911233735 implements MigrationInterface {
    name = 'TableCoordinate1704911233735';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`priority\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`createdBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`updatedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`deletedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` DROP COLUMN \`updatedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` DROP COLUMN \`deletedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` DROP COLUMN \`createdBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` DROP COLUMN \`updatedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` DROP COLUMN \`deletedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP COLUMN \`descriptions\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` ADD \`coordinateX\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` ADD \`coordinateY\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`createdBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`updatedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`deletedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`note\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`priority\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(2000) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`note\``);
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD \`note\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` DROP COLUMN \`isSuperAdmin\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD \`isSuperAdmin\` tinyint NOT NULL DEFAULT 0`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` DROP COLUMN \`name\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` ADD \`name\` varchar(100) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`customerName\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`customerName\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`paymentMethod\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`paymentMethod\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`billingStatus\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`billingStatus\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`reasonCanceled\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`reasonCanceled\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`note\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`name\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`name\` varchar(100) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` DROP COLUMN \`key\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` ADD \`key\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`values\` \`values\` json NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP COLUMN \`foodName\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` ADD \`foodName\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP COLUMN \`foodImgId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` ADD \`foodImgId\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`price\` \`price\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` ADD \`note\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`shift\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`shift\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`note\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`date\` \`date\` timestamp NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`status\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`status\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
        );
        // await queryRunner.query(`ALTER TABLE \`billings\` ADD CONSTRAINT \`FK_036cd9a76cae854a9a20a63d4b5\` FOREIGN KEY (\`tableId\`) REFERENCES \`tables_restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`billings\` ADD CONSTRAINT \`FK_29645f8016f178934a29662136b\` FOREIGN KEY (\`cashierId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_60fab7ec4cf588b61da4fb14d67\` FOREIGN KEY (\`tableId\`) REFERENCES \`tables_restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`foods\` ADD CONSTRAINT \`FK_886e53d39cd3d4f2a1c146fd674\` FOREIGN KEY (\`foodImgId\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`foods\` ADD CONSTRAINT \`FK_28ab9408d9ade121a043790557c\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`food_billings\` ADD CONSTRAINT \`FK_b25a7687e40ec56e8cad46e1106\` FOREIGN KEY (\`foodId\`) REFERENCES \`foods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`food_billings\` ADD CONSTRAINT \`FK_6a8fdb0aa02e039bc1ab08c83fa\` FOREIGN KEY (\`billingId\`) REFERENCES \`billings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`report_revenues\` ADD CONSTRAINT \`FK_6927244cc26a9998bc367693a93\` FOREIGN KEY (\`shiftLeaderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP FOREIGN KEY \`FK_6927244cc26a9998bc367693a93\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` DROP FOREIGN KEY \`FK_6a8fdb0aa02e039bc1ab08c83fa\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` DROP FOREIGN KEY \`FK_b25a7687e40ec56e8cad46e1106\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP FOREIGN KEY \`FK_28ab9408d9ade121a043790557c\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP FOREIGN KEY \`FK_886e53d39cd3d4f2a1c146fd674\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_60fab7ec4cf588b61da4fb14d67\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP FOREIGN KEY \`FK_29645f8016f178934a29662136b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP FOREIGN KEY \`FK_036cd9a76cae854a9a20a63d4b5\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_resources\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permissions\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`permission_actions\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`status\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`status\` enum ('APPROVE', 'JUST_CREATE', 'WAITING_APPROVE', 'REQUEST_CHECK_AGAIN', 'CHECKED_AGAIN', 'REJECT') NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`date\` \`date\` timestamp NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`note\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` DROP COLUMN \`shift\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` ADD \`shift\` enum ('morningShift', 'afternoonShift') NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`report_revenues\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` ADD \`note\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_billings\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`categoryId\` \`categoryId\` int NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`price\` \`price\` int NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP COLUMN \`foodImgId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` ADD \`foodImgId\` varchar(2500) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` DROP COLUMN \`foodName\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` ADD \`foodName\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`values\` \`values\` json NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` DROP COLUMN \`key\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` ADD \`key\` enum ('user_position') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`general_settings\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`name\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`bookings\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`note\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`reasonCanceled\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`reasonCanceled\` enum ('out_of_food', 'another_reason') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`billingStatus\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`billingStatus\` enum ('wait_for_select_food', 'eating', 'wait_for_pay', 'canceled', 'paid') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`paymentMethod\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`paymentMethod\` enum ('ready_cash', 'banking') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` DROP COLUMN \`customerName\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` ADD \`customerName\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`billings\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` DROP COLUMN \`name\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` ADD \`name\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` DROP COLUMN \`isSuperAdmin\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD \`isSuperAdmin\` int NOT NULL DEFAULT '0'`,
        );
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`note\``);
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD \`note\` varchar(2500) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`roles\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`provinces\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`priority\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`note\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`deletedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`updatedBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` DROP COLUMN \`createdBy\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateY\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateX\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`foods\` ADD \`descriptions\` varchar(2000) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` ADD \`deletedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` ADD \`updatedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` ADD \`createdBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` ADD \`deletedAt\` timestamp NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_logging\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`deletedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`updatedBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`createdBy\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`note\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD \`priority\` int NULL`,
        );
    }
}
