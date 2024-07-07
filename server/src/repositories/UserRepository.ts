import User, {CreateUserSchema} from "../models/User";
import database from "../config/database";
import {hashPassword} from "../helpers/passwordHelper";
import {ResultSetHeader} from "mysql2";

class UserRepository {
    static async create(user: CreateUserSchema): Promise<ResultSetHeader> {
        const hashedPassword = await hashPassword(user.password);
        const [results] = await database.execute<ResultSetHeader>("INSERT INTO User (name, email, password, city, role) VALUES (?, ?, ?, ?, ?)", [user.name, user.email, hashedPassword, user.city, user.role]);
        return results;
    }

    static async selectAll(): Promise<User[]> {
        const [results] = await database.execute<User[]>("SELECT * FROM User");
        return results;
    }

    static async selectAllByRoleId(roleId: number): Promise<User[]> {
        const [results] = await database.execute<User[]>("SELECT * FROM User WHERE role = ?", [roleId]);
        return results;
    }

    static async selectAllByCityId(cityId: number): Promise<User[]> {
        const [results] = await database.execute<User[]>("SELECT * FROM User WHERE city = ?", [cityId]);
        return results;
    }

    static async selectOneByUserId(userId: number): Promise<User[]> {
        const [results] = await database.execute<User[]>("SELECT * FROM User WHERE user_id = ?", [userId]);
        return results;
    }

    static async selectOneByEmail(email: string): Promise<User[]> {
        const [results] = await database.execute<User[]>("SELECT * FROM User WHERE email = ?", [email]);
        return results;
    }

    static async update(userId: number, user: User): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("UPDATE User SET name = ?, email = ?, city = ?, role = ? WHERE user_id = ?", [user.name, user.email, user.city, user.role, userId]);
        return results;
    }

    static async updatePassword(userId: number, password: string): Promise<ResultSetHeader> {
        const hashedPassword = await hashPassword(password);
        const [results] = await database.execute<ResultSetHeader>("UPDATE User SET password = ? WHERE user_id = ?", [hashedPassword, userId]);
        return results;
    }

    static async delete(userId: number): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("DELETE FROM User WHERE user_id = ?", [userId]);
        return results;
    }
}

export default UserRepository;