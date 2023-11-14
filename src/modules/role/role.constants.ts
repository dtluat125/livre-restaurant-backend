export const roleAttributesList = [
    'role.id',
    'role.name',
    'role.description',
    'rolePermission.permissionId',
];

export enum ModuleName {
    DASHBOARD = 'dashboard',
    USER = 'user',
    TABLE_DIAGRAM = 'table_diagram',
    BOOKING = 'booking',
    MENU_FOOD = 'food',
    MENU_CATEGORY = 'category',
    BILLING = 'billing',
    REPORT_REVENUE = 'report_revenue',
    ROLE = 'role',
}

export enum PermissionResources {
    DASHBOARD = 'dashboard',
    USER = 'user',
    TABLE_DIAGRAM = 'table_diagram',
    BOOKING = 'booking',
    MENU_FOOD = 'food',
    MENU_CATEGORY = 'category',
    BILLING = 'billing',
    REPORT_REVENUE = 'report_revenue',
    ROLE = 'role',
}

export enum PermissionActions {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    UPDATE_ROLE = 'update_role',
    APPROVE_STATUS = 'approve_status',
}
