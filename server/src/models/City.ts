import {RowDataPacket} from "mysql2";

export default interface City extends RowDataPacket {
    city_id: number;
    name: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    timezone: string;
    population: string;
    area: string;
    details: string;
}

export interface CitySchema {
    name: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    timezone: string;
    population: string;
    area: string;
    details: string;
}

export const citySchemaObject: { [key: string]: string } = {
    name: "string",
    state: "string",
    country: "string",
    postal_code: "string",
    latitude: "string",
    longitude: "string",
    timezone: "string",
    population: "string",
    area: "string",
    details: "string",
}