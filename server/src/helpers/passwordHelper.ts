import bcrypt from 'bcrypt';
import User from "../models/User";

export const hashPassword = async (password: string) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("[server] Error hashing password: ", error);
    }
}

export const comparePassword = async (plaintextPassword: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(plaintextPassword, hashedPassword);
    } catch (error) {
        console.error("[server] Error comparing password: ", error);
    }
}

export const removeUserPassword = (user: User) => {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}