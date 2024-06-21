import {RowDataPacket} from "mysql2";

export default interface Report extends RowDataPacket {
    report_id: number;
    enseigne: string;
    description: string;
    location: string;
    photoUrl: string;
    city: number;
    user_id: number;
    status: string;
    created_at?: Date;
    updated_at?: Date;
}

export const reportSchema: { [key: string]: string } = {
    enseigne: "string",
    description: "string",
    location: "string",
    photoUrl: "string",
    city: "number",
    user_id: "number",
    status: "string",
}