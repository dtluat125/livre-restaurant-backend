import {MigrationInterface, QueryRunner} from "typeorm";

export class TableCoordinateType1704915137329 implements MigrationInterface {
    name = 'TableCoordinateType1704915137329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deletedBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`note\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`priority\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`note\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`priority\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateX\``);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` ADD \`coordinateX\` decimal(10,5) NULL`);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateY\``);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` ADD \`coordinateY\` decimal(10,5) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateY\``);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` ADD \`coordinateY\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` DROP COLUMN \`coordinateX\``);
        await queryRunner.query(`ALTER TABLE \`tables_restaurants\` ADD \`coordinateX\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`priority\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`note\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deletedBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`priority\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`note\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`createdBy\` int NULL`);
    }

}
