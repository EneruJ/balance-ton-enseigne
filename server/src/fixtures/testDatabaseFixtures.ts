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
    const cities = generateCities(5);
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
    const users = await generateUsers(5, 5);
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
    const reports = generateReports(10, 5, 5);
    try {
        for (const report of reports) {
            await ReportRepository.create(report);
        }
        // console.log('[database]: Fake reports inserted.');
    } catch (error) {
        console.error(`[database]: Unable to insert fake reports: ${error}`);
    }
}