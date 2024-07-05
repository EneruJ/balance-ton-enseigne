import {RowDataPacket} from "mysql2";

export default interface User extends RowDataPacket {
    user_id: number;
    name: string;
    email: string;
    password: string;
    city: number;
    role: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserSchema {
    name: string;
    email: string;
    password: string;
    city: number;
    role: number;
}

export interface UpdateUserSchema {
    name: string;
    email: string;
    city: number;
    role: number;
}

export const createUserSchemaObject: { [key: string]: string } = {
    name: "string",
    email: "string",
    password: "string",
    city: "number",
    role: "number",
}

export const updateUserSchemaObject: { [key: string]: string } = {
    name: "string",
    email: "string",
    city: "number",
    role: "number",
}