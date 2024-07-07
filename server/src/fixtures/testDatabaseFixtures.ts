import {PoolConnection} from "mysql2/promise";
import path from "node:path";
import {readFile} from "node:fs/promises";
import {generateCities} from "./cityFixtures";
import {generateRoles} from "./roleFixtures";
import {generateUsers} from "./userFixtures";
import {generateReports} from "./reportFixtures";
import CityRepository from "../repositories/CityRepository";
import RoleRepository from "../repositories/RoleRepository";
import UserRepository from "../repositories/UserRepository";
import ReportRepository from "../repositories/ReportRepository";

const NUMBER_OF_CITIES = 3;
const NUMBER_OF_USERS = 6;
const NUMBER_OF_REPORTS = 12;

export default async function initializeTestDatabase(connexion: PoolConnection) {
    await createTablesFromSqlFile(connexion);
    await insertFakeData();
}

async function createTablesFromSqlFile(connection: PoolConnection) {
    const absolutePath = path.join(__dirname, '../../../docker-entrypoint-initdb.d/init-test.sql');
    // console.log(`[database]: Reading SQL file: ${absolutePath}`);
    const sqlContent = await readFile(absolutePath, {encoding: 'utf-8'});
    const queries = sqlContent.split(/;\s*$/m);

    try {
        for (const query of queries) {
            if (query.length > 0) {
                await connection.query(query);
            }
        }
        // console.log('[database]: Tables created.');
    } catch (error) {
        console.error(`[database]: Unable to create tables: ${error}`);
    }
}

async function insertFakeData() {
    try {
        await insertFakeCities();
        await insertFakeRoles();
        await insertFakeUsers();
        await insertFakeReports();
        // console.log('[database]: All fake data inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert all fake data: ${error}`);
    }
}

async function insertFakeCities() {
    const cities = generateCities(NUMBER_OF_CITIES);
    try {
        for (const city of cities) {
            await CityRepository.create(city);
        }
        // console.log('[database]: Fake cities inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert cities data: ${error}`);
    }
}

async function insertFakeRoles() {
    const roles = generateRoles();
    try {
        for (const role of roles) {
            await RoleRepository.create(role)
        }
        // console.log('[database]: Fake roles inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert fake roles: ${error}`);
    }
}

async function insertFakeUsers() {
    const users = await generateUsers(NUMBER_OF_USERS, NUMBER_OF_CITIES);
    try {
        for (const user of users) {
            await UserRepository.create(user);
        }
        // console.log('[database]: Fake users inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert fake users: ${error}`);
    }
}

async function insertFakeReports() {
    const reports = generateReports(NUMBER_OF_REPORTS, NUMBER_OF_CITIES, NUMBER_OF_USERS);
    try {
        for (const report of reports) {
            await ReportRepository.create(report);
        }
        // console.log('[database]: Fake reports inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert fake reports: ${error}`);
    }
}