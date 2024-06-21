import {RowDataPacket} from "mysql2";

export default interface Role extends RowDataPacket {
    role_id: number;
    name: string;
}

export const roleSchema: { [key: string]: string } = {
    name: "string",
}