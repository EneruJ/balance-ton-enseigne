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

export const userSchemaCreate: { [key: string]: string } = {
    name: "string",
    email: "string",
    password: "string",
    city: "number",
    role: "number",
}

export const userSchemaUpdate: { [key: string]: string } = {
    name: "string",
    email: "string",
    city: "number",
    role: "number",
}