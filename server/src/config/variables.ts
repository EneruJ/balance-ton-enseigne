import dotenv from "dotenv";

export const TEST_ENV = process.env.NODE_ENV;

if (TEST_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

export const APP_PORT: string = process.env.APP_PORT ?? "3000";

export const DB_HOST: string = process.env.DB_HOST ?? "localhost";
export const DB_PORT: string = process.env.DB_PORT ?? "3306";
export const DB_DATABASE: string = process.env.DB_DATABASE ?? "database";
export const DB_USER: string = process.env.DB_USERNAME ?? "user";
export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? "password";

export const JWT_SECRET: string = process.env.JWT_SECRET ?? "secret";