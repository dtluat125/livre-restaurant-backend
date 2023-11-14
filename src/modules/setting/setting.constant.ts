import { GeneralSettings } from '../common/entity/general-settings.entity';

// for general setting
export enum SettingKey {
    USER_POSITION = 'user_position',
}

export const settingListAtttributes: (keyof GeneralSettings)[] = [
    'id',
    'key',
    'values',
];
export const positionListAtttributes = ['id', 'name'];

// for holiday setting
export const MAX_EVENT_PER_DAY = 1;

export const DEFAULT_LIMIT_FOR_HOLIDAY = 31;
