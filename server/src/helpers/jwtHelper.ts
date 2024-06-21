import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/variables";
import User from "../models/User";

export const generateToken = (user: User) => {
    return jwt.sign(
        user,
        JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
}