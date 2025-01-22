export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Permissions {
    imagenes: {
        useCamera: boolean;
    }
    guiaContribucion: {
        create: boolean;
    };
}

export interface Flash {
    message?: string,
    description?: string,
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        permissions: Permissions;
    };
    flash?: Flash;
};
