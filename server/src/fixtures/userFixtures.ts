import {fakerFR as faker} from '@faker-js/faker';
import {CreateUserSchema} from "../models/User";
import {hashPassword} from "../helpers/passwordHelper";

export async function generateUser(numberOfCitiesPossible: number): Promise<CreateUserSchema> {
    const hashedPassword = await hashPassword(faker.internet.password());
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: hashedPassword,
        city: faker.number.int({min: 1, max: numberOfCitiesPossible}),
        role: faker.number.int({min: 1, max: 2}),
    };
}

export async function generateUsers(amount: number, numberOfCitiesPossible: number): Promise<CreateUserSchema[]> {
    const users: CreateUserSchema[] = [];
    for (let i = 0; i < amount; i++) {
        users.push(await generateUser(numberOfCitiesPossible));
    }
    return users;
}