import {Request, Response} from "express";
import {loginSchema} from "../models/Login";
import {validateModelSchema} from "../helpers/validateModelHelper";
import UserRepository from "../repositories/UserRepository";
import {comparePassword, removeUserPassword} from "../helpers/passwordHelper";

class AuthController {
    static async login(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(loginSchema, request.body);

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
                    message: "Email not found.",
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
                    const token = "token";
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
        response.json("Logout route.");
    }

    static async current(request: Request, response: Response) {
        response.json("Current route.");
    }
}

export default AuthController;