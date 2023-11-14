export const MODULE_NAME = 'report-revenue';

export enum OrderBy {
    CREATED_AT = 'createdAt',
}

export enum ReasonCanceled {
    OUT_OF_MATERIAL = 'out_of_material',
    LONG_WAITING_TIME = 'long_waiting_time',
    CHANGE_TO_ANOTHER = 'change_to_another',
    ANOTHER_REASON = 'another_reason',
}
