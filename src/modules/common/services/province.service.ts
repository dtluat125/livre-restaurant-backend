import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProvinceList } from '../dto/responses/common-responses.dto';
import { Province } from 'src/modules/user/entity/province.entity';
import { DEFAULT_LIMIT_FOR_DROPDOWN } from '../../../common/constants';

@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>,
    ) {}

    async getProvinces(): Promise<ProvinceList> {
        try {
            const [items, totalItems] =
                await this.provinceRepository.findAndCount({
                    select: ['id', 'name'],
                    order: {
                        order: 'DESC',
                    },
                    take: DEFAULT_LIMIT_FOR_DROPDOWN,
                });

            return {
                items,
                totalItems,
            };
        } catch (error) {
            throw error;
        }
    }
}
