import {fakerFR as faker} from "@faker-js/faker";
import {ReportSchema} from "../models/Report";

export function generateReport(numberOfCitiesPossible: number, numberOfUsersPossible: number): ReportSchema {
    return {
        enseigne: faker.company.name(),
        description: faker.word.words(10),
        location: faker.location.nearbyGPSCoordinate().toString(),
        photoUrl: faker.image.url(),
        city: faker.number.int({min: 1, max: numberOfCitiesPossible}),
        user_id: faker.number.int({min: 1, max: numberOfUsersPossible}),
        status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
    };
}

export function generateReports(amount: number, numberOfCitiesPossible: number, numberOfUsersPossible: number): ReportSchema[] {
    const reports: ReportSchema[] = [];
    for (let i = 0; i < amount; i++) {
        reports.push(generateReport(numberOfCitiesPossible, numberOfUsersPossible));
    }
    return reports;
}