export interface IUser {
    id?: number;
    role_id: number;
    name: string;
    email: string;
    password: string;
    city: string;
    created_at?: Date;
    updated_at?: Date;
}