import {Request, Response} from "express";
import {loginSchemaObject} from "../models/Login";
import {validateModelSchema} from "../helpers/validateModelHelper";
import UserRepository from "../repositories/UserRepository";
import {comparePassword, removeUserPassword} from "../helpers/passwordHelper";
import {generateToken} from "../helpers/jwtHelper";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/variables";
import User from "../models/User";

class AuthController {
    static async login(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(loginSchemaObject, request.body);

        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await UserRepository.selectOneByEmail(request.body.email);
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "User not found.",
                });
            } else {
                const user = results[0];
                const isPasswordMatch = await comparePassword(request.body.password, user.password);
                if (!isPasswordMatch) {
                    return response.status(401).json({
                        status: 401,
                        statusText: "Unauthorized",
                        message: "Invalid password.",
                    });
                } else {
                    const token = generateToken(user);
                    return response.status(200).json({
                        status: 200,
                        statusText: "OK",
                        message: "Login successful.",
                        data: {
                            user: removeUserPassword(user),
                            token
                        },
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to login.",
                error: error,
            });
        }

    }

    static async logout(request: Request, response: Response) {
        return response.status(204).json({
            status: 204,
            statusText: "No Content",
            message: "Logout successful.",
        });
    }

    static async current(request: Request, response: Response) {
        const authorization = request.headers.authorization;
        if (authorization) {
            const token = authorization.split(" ")[1];
            const decoded: User = jwt.verify(token, JWT_SECRET) as User;

            try {
                const results = await UserRepository.selectOneByUserId(decoded.user_id);
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "User found.",
                    data: removeUserPassword(results[0]),
                });
            } catch (error) {
                return response.status(500).json({
                    status: 500,
                    statusText: "Internal Server Error",
                    message: "An error occurred while trying to get current user.",
                    error: error,
                });
            }
        }
    }
}

export default AuthController;