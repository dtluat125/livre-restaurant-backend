export enum WITH_DELETED_OPTION {
    YES = 1,
    NO = 0,
}
export enum WITH_INACTIVE_OPTION {
    YES = 1,
    NO = 0,
}

export enum WITH_WAITING_FOR_APPROVAL_OPTION {
    YES = 1,
    NO = 0,
}

export enum AcceptStatus {
    APPROVE = 'APPROVE',
    JUST_CREATE = 'JUST_CREATE',
    WAITING_APPROVE = 'WAITING_APPROVE',
    REQUEST_CHECK_AGAIN = 'REQUEST_CHECK_AGAIN',
    CHECKED_AGAIN = 'CHECKED_AGAIN',
    REJECT = 'REJECT',
}
