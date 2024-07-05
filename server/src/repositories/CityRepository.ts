import City, {CitySchema} from "../models/City";
import database from "../config/database";
import {ResultSetHeader} from "mysql2";

class CityRepository {
    static async create(city: CitySchema): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("INSERT INTO city (name, state, country, postal_code, latitude, longitude, timezone, population, area, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [city.name, city.state, city.country, city.postal_code, city.latitude, city.longitude, city.timezone, city.population, city.area, city.details]);
        return results;
    }

    static async selectAll(): Promise<City[]> {
        const [results] = await database.execute<City[]>("SELECT * FROM city");
        return results;
    }

    static async selectOneByCityId(cityId: number): Promise<City[]> {
        const [results] = await database.execute<City[]>("SELECT * FROM city WHERE city_id = ?", [cityId]);
        return results;
    }

    static async selectOneByPostalCode(postalCode: string): Promise<City[]> {
        const [results] = await database.execute<City[]>("SELECT * FROM city WHERE postal_code = ?", [postalCode]);
        return results;
    }

    static async update(cityId: number, city: City): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("UPDATE city SET name = ?, state = ?, country = ?, postal_code = ?, latitude = ?, longitude = ?, timezone = ?, population = ?, area = ?, details = ? WHERE city_id = ?", [city.name, city.state, city.country, city.postal_code, city.latitude, city.longitude, city.timezone, city.population, city.area, city.details, cityId]);
        return results;
    }

    static async delete(cityId: number): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("DELETE FROM city WHERE city_id = ?", [cityId]);
        return results;
    }
}

export default CityRepository;