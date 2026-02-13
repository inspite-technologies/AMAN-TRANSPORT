export type Role =
    | 'SUPER_ADMIN'
    | 'HR_MANAGER'
    | 'OPERATIONS_MANAGER'
    | 'DISPATCHER'
    | 'ACCOUNTANT'
    | 'IMPORT_EXPORT_MANAGER'
    | 'PRODUCTION_MANAGER'
    | 'WAREHOUSE_STAFF'
    | 'DRIVER'
    | 'BRANCH_MANAGER';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export type BusinessSegment = 'TRANSPORT' | 'IMPORT' | 'EXPORT' | 'FOOD_PRODUCTION' | 'FLEET_MAINTENANCE';

export interface Branch {
    id: string;
    name: string;
    location: string;
    country: string;
}

export interface Company {
    id: string;
    name: string;
    logo?: string;
    segments: BusinessSegment[];
    branches: Branch[];
}
