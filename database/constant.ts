import { TableColumnOptions } from 'typeorm';

export enum TeamUserRole {
    DEVELOPER = 'developer',
    TESTER = 'tester',
    PROJECTMANAGER = 'project manager',
    INFRA = 'infra',
    ACCOUNTING = 'accounting',
}

export enum TABLE_NAME {
    Users = 'users',
    Files = 'files',
    GeneralSettings = 'general_settings',
    DeviceTypes = 'device_types',
    Roles = 'roles',
    Provinces = 'provinces',
    UserLogging = 'user_logging',
    Billings = 'billings',
    User_Tokens = 'user_tokens',
    UserPosition = 'user_position',
    Bank = 'banks',
    PermissionActions = 'permission_actions',
    Permissions = 'permissions',
    PermissionResources = 'permission_resources',
    RolePermissions = 'role_permissions',
    Bookings = 'bookings',
    Categories = 'categories',
    Foods = 'foods',
    TablesRestaurants = 'tables_restaurants',
    ReportRevenues = 'report_revenues',
    FoodBillings = 'food_billings',
}

export const commonColumns: TableColumnOptions[] = [
    {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
    },
    {
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: true,
    },
    {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: true,
    },
    {
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
    },
    {
        name: 'createdBy',
        type: 'int',
        isNullable: true,
    },
    {
        name: 'updatedBy',
        type: 'int',
        isNullable: true,
    },
    {
        name: 'deletedBy',
        type: 'int',
        isNullable: true,
    },
];

export enum DBPermissionActions {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    UPDATE_ROLE = 'update_role',
    APPROVE_STATUS = 'approve_status',
}

export enum DBPermissionResources {
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
