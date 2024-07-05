import Role, {RoleSchema} from "../models/Role";
import database from "../config/database";
import {ResultSetHeader} from "mysql2";

class RoleRepository {
    static async create(role: RoleSchema): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("INSERT INTO Role (name) VALUES (?)", [role.name]);
        return results;
    }

    static async selectAll(): Promise<Role[]> {
        const [results] = await database.execute<Role[]>("SELECT * FROM Role");
        return results;
    }

    static async selectOneByRoleId(roleId: number): Promise<Role[]> {
        const [results] = await database.execute<Role[]>("SELECT * FROM Role WHERE role_id = ?", [roleId]);
        return results;
    }

    static async selectOneByName(name: string): Promise<Role[]> {
        const [results] = await database.execute<Role[]>("SELECT * FROM Role WHERE name = ?", [name]);
        return results;
    }

    static async update(roleId: number, role: Role): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("UPDATE Role SET name = ? WHERE role_id = ?", [role.name, roleId]);
        return results;
    }

    static async delete(roleId: number): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("DELETE FROM Role WHERE role_id = ?", [roleId]);
        return results;
    }
}

export default RoleRepository;