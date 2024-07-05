import {RowDataPacket} from "mysql2";

export default interface City extends RowDataPacket {
    city_id: number;
    name: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    timezone: string;
    population: number;
    area: number;
    details: string;
}

export interface CitySchema {
    name: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    timezone: string;
    population: number;
    area: number;
    details: string;
}

export const citySchemaObject: { [key: string]: string } = {
    name: "string",
    state: "string",
    country: "string",
    postal_code: "string",
    latitude: "number",
    longitude: "number",
    timezone: "string",
    population: "number",
    area: "number",
    details: "string",
}