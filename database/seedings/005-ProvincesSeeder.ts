import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
dotenv.config();
export class SeedingProvinces1720963593400 implements MigrationInterface {
    tableName = TABLE_NAME.Provinces;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            await queryRunner.manager.getRepository(this.tableName).insert([
                {
                    name: 'Thành phố Hà Nội',
                    description: 'Thành phố Trung ương',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hà Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Cao Bằng',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bắc Kạn',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Tuyên Quang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Lào Cai',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Điện Biên',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Lai Châu',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Sơn La',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Yên Bái',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hoà Bình',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Thái Nguyên',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Lạng Sơn',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Quảng Ninh',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bắc Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Phú Thọ',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Vĩnh Phúc',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bắc Ninh',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hải Dương',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Thành phố Hải Phòng',
                    description: 'Thành phố Trung ương',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hưng Yên',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Thái Bình',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hà Nam',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Nam Định',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Ninh Bình',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Thanh Hóa',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Nghệ An',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hà Tĩnh',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Quảng Bình',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Quảng Trị',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Thừa Thiên Huế',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Thành phố Đà Nẵng',
                    description: 'Thành phố Trung ương',
                    order: 0,
                },
                {
                    name: 'Tỉnh Quảng Nam',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Quảng Ngãi',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bình Định',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Phú Yên',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Khánh Hòa',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Ninh Thuận',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bình Thuận',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Kon Tum',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Gia Lai',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Đắk Lắk',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Đắk Nông',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Lâm Đồng',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bình Phước',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Tây Ninh',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bình Dương',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Đồng Nai',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bà Rịa - Vũng Tàu',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Thành phố Hồ Chí Minh',
                    description: 'Thành phố Trung ương',
                    order: 0,
                },
                {
                    name: 'Tỉnh Long An',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Tiền Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bến Tre',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Trà Vinh',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Vĩnh Long',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Đồng Tháp',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh An Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Kiên Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Thành phố Cần Thơ',
                    description: 'Thành phố Trung ương',
                    order: 0,
                },
                {
                    name: 'Tỉnh Hậu Giang',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Sóc Trăng',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Bạc Liêu',
                    description: 'Tỉnh',
                    order: 0,
                },
                {
                    name: 'Tỉnh Cà Mau',
                    description: 'Tỉnh',
                    order: 0,
                },
            ]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            await queryRunner.manager.getRepository(this.tableName).delete({});
        }
    }
}
