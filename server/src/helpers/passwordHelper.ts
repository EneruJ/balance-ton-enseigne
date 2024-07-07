import bcrypt from 'bcrypt';
import User, {UserWithoutPassword} from "../models/User";

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (plaintextPassword: string, hashedPassword: string) => {
        return await bcrypt.compare(plaintextPassword, hashedPassword);
}

export const removeUserPassword = (user: User): UserWithoutPassword => {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}