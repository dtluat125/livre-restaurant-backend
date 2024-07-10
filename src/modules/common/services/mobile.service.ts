import { BillingStatus } from './../../billing/billing.constant';
import { FoodBilling } from '../../food-billing/entity/food-billing.entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { Billing } from 'src/modules/billing/entity/billing.entity';
import { BillingDetailResponseDto } from 'src/modules/billing/dto/billing.dto';

@Injectable()
export class MobileService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    async getBillingRelativeTable(tableId: number) {
        try {
            await this.dbManager.update(
                Billing,
                {
                    tableId: tableId,
                    billingStatus: BillingStatus.WAIT_FOR_SELECT_FOOD,
                },
                {
                    billingStatus: BillingStatus.EATING,
                },
            );
            const billing = await this.getBillingDetail(tableId, [
                BillingStatus.EATING,
            ]);

            return billing;
        } catch (error) {
            throw error;
        }
    }

    async getFoodBillingRelativeTable(tableId: number) {
        try {
            const billing = await this.dbManager.findOne(Billing, {
                where: {
                    tableId: tableId,
                    billingStatus: BillingStatus.EATING,
                },
            });
            if (billing) {
                const items = await this.dbManager.find(FoodBilling, {
                    where: { billingId: billing.id },
                });
                return {
                    items,
                };
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async getListFoodBilling(billingId: number) {
        try {
            const items = await this.dbManager.find(FoodBilling, {
                where: { billingId: billingId },
            });
            return {
                items,
            };
        } catch (error) {
            throw error;
        }
    }

    async getBillingDetail(
        tableId: number,
        billingStatuses: BillingStatus[],
    ): Promise<BillingDetailResponseDto> {
        try {
            const billing = await this.dbManager.findOne(Billing, {
                relations: ['table'],
                where: {
                    tableId: tableId,
                    billingStatus: In(billingStatuses),
                },
            });
            return billing;
        } catch (error) {
            throw error;
        }
    }
}
