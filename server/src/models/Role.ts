import {RowDataPacket} from "mysql2";

export default interface Role extends RowDataPacket {
    role_id: number;
    name: string;
}

export interface RoleSchema {
    name: string,
}

export const roleSchemaObject: { [key: string]: string } = {
    name: "string",
}