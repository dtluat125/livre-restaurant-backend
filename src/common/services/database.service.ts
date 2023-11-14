import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import pick from 'lodash/pick';
import { EntityManager, EntityTarget, Not } from 'typeorm';
import { USER_ACTION, HTTP_METHOTDS } from '../constants';
import { UserLoggingDto } from '../../modules/common/dto/request/user-logging.dto';
import { UserLogging } from 'src/modules/common/entity/user-logging.entity';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    async checkItemExist<Entity>(
        entity: EntityTarget<Entity>,
        fieldName: string,
        fieldValue: string | number | boolean,
        itemId?: number,
    ) {
        try {
            const whereCondition = {
                [fieldName]: fieldValue,
            };
            if (itemId) {
                // when update item
                Object.assign(whereCondition, {
                    id: Not(itemId),
                });
            }
            const item = await this.dbManager.count(entity, {
                where: whereCondition,
            });
            return item > 0;
        } catch (error) {
            throw error;
        }
    }

    async getDataById<Entity>(entity: EntityTarget<Entity>, id: number | null) {
        try {
            if (id) {
                const result = await this.dbManager.findOne(entity, id);
                return result;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async recordUserLogging(data: UserLoggingDto) {
        try {
            const moduleName = data.route.path.split('/');
            const conditions = JSON.stringify(Object.keys(data.route?.methods))
                .replace(/[["]/g, '')
                .replace(']', '');
            if (conditions === HTTP_METHOTDS.POST) {
                const descriptions = `Create ${moduleName[3]}`;
                const result = await this.dbManager.save(UserLogging, {
                    userId: data.userId,
                    action: USER_ACTION.POST,
                    oldValue: null,
                    newValue: data.newValue,
                    description: descriptions,
                });
                return result;
            }
            if (conditions === HTTP_METHOTDS.PATCH) {
                const descriptions = `Update ${moduleName[3]}`;
                const combinedObject = {
                    ...data.oldValue,
                    ...data.newValue,
                };

                //compare 2 object and take difference value
                const newValue = Object.entries(combinedObject).reduce(
                    (acc, [key, value]) => {
                        if (
                            !Object.values(data.oldValue).includes(value) ||
                            !Object.values(data.newValue).includes(value)
                        )
                            acc[key] = value;
                        return acc;
                    },
                    {},
                );
                delete newValue['createdAt'];
                delete newValue['updatedAt'];
                delete newValue['startAt'];
                delete newValue['endAt'];

                //take data field in oldValue as newValue field
                const oldValue = pick(
                    data.oldValue,
                    Object.getOwnPropertyNames(newValue),
                );
                const result = await this.dbManager.save(UserLogging, {
                    userId: data.userId,
                    action: USER_ACTION.PATCH,
                    oldValue: oldValue,
                    newValue: newValue,
                    description: descriptions,
                });
                return result;
            }
            if (conditions === HTTP_METHOTDS.DELETE) {
                const descriptions = `Delete ${moduleName[3]}`;
                const result = await this.dbManager.save(UserLogging, {
                    userId: data.userId,
                    action: USER_ACTION.DELETE,
                    oldValue: data.oldValue,
                    newValue: null,
                    description: descriptions,
                });
                return result;
            }
        } catch (error) {
            throw error;
        }
    }
}
