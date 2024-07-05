import {fakerFR as faker} from "@faker-js/faker";
import {CitySchema} from "../models/City";

export function generateCity(): CitySchema {
    return {
        name: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postal_code: faker.location.zipCode(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timezone: faker.location.timeZone(),
        population: faker.number.int(1000000),
        area: faker.number.float(1000),
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