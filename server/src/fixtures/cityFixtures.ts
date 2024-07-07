import {fakerFR as faker} from "@faker-js/faker";
import {CitySchema} from "../models/City";

export function generateCity(): CitySchema {
    return {
        name: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postal_code: faker.location.zipCode(),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        timezone: faker.location.timeZone(),
        population: faker.number.int(1000000).toString(),
        area: faker.number.float(1000).toString(),
        details: faker.lorem.sentence(3),
    };
}

export function generateCities(amount: number): CitySchema[] {
    const cities: CitySchema[] = [];
    for (let i = 0; i < amount; i++) {
        cities.push(generateCity());
    }
    return cities;
}