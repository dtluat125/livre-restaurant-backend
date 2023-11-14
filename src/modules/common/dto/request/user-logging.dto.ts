export class RouteData {
    path: string;
    methods: Record<string, unknown>;
}

export class UserLoggingDto {
    userId: number;
    route: RouteData;
    oldValue: Record<string, unknown>;
    newValue: Record<string, unknown>;
}
