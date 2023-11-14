export const MODULE_NAME = 'report-revenue';

export enum OrderBy {
    CREATED_AT = 'createdAt',
}

export enum BillingStatus {
    WAIT_FOR_SELECT_FOOD = 'wait_for_select_food',
    EATING = 'eating',
    WAIT_FOR_PAY = 'wait_for_pay',
    CANCELED = 'canceled',
    PAID = 'paid',
}

export enum ReasonCanceled {
    OUT_OF_FOOD = 'out_of_food',
    ANOTHER_REASON = 'another_reason',
}

export enum PaymentMethod {
    READY_CASH = 'ready_cash',
    BANKING = 'banking',
}
