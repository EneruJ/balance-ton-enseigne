import {Request, Response} from "express";
import UserRepository from "../repositories/UserRepository";
import {validateModelSchema} from "../helpers/validateModelHelper";
import {userSchemaCreate, userSchemaUpdate} from "../models/User";
import {removeUserPassword} from "../helpers/passwordHelper";

class UserController {
    static async create(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(userSchemaCreate, request.body);

        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await UserRepository.selectOneByEmail(request.body.email);
            if (results.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "Email is already used.",
                });
            } else {
                const results = await UserRepository.create(request.body);
                const user = await UserRepository.selectOneByUserId(results.insertId);
                return response.status(201).json({
                    status: 201,
                    statusText: "Created",
                    message: "User created successfully.",
                    data: removeUserPassword(user[0]),
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to create the user.",
                error: error,
            });
        }
    }

    static async getAll(request: Request, response: Response) {
        try {
            const results = await UserRepository.selectAll();
            return response.status(200).json({
                status: 200,
                statusText: "OK",
                message: "All users fetched successfully.",
                data: results.map(user => removeUserPassword(user)),
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get all users.",
                error: error,
            });
        }
    }

    static async getOne(request: Request, response: Response) {
        try {
            const results = await UserRepository.selectOneByUserId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "User not found.",
                });
            } else {
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "User fetched successfully.",
                    data: removeUserPassword(results[0]),
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get the user.",
                error: error,
            });
        }
    }

    static async update(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(userSchemaUpdate, request.body);

        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await UserRepository.selectOneByUserId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "User not found.",
                });
            } else {
                const results = await UserRepository.selectOneByEmail(request.body.email);
                if (results.length > 0 && results[0].user_id !== Number(request.params.id)) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "Email is already used.",
                    });
                } else {
                    await UserRepository.update(Number(request.params.id), request.body);
                    const user = await UserRepository.selectOneByUserId(Number(request.params.id));
                    return response.status(200).json({
                        status: 200,
                        statusText: "OK",
                        message: "User updated successfully.",
                        data: removeUserPassword(user[0]),
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the user.",
                error: error,
            });
        }
    }

    static async updatePassword(request: Request, response: Response) {
        if (!request.body.password) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid request body. Field 'password' is required.",
            });
        }

        try {
            const results = await UserRepository.selectOneByUserId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "User not found.",
                });
            } else {
                await UserRepository.updatePassword(Number(request.params.id), request.body.password);
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "User password updated successfully.",
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the user password.",
                error: error,
            });
        }
    }

    static async delete(request: Request, response: Response) {
        try {
            const results = await UserRepository.delete(Number(request.params.id));
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "User not found.",
                });
            } else {
                return response.status(204).json({
                    status: 204,
                    statusText: "No Content",
                    message: "User deleted successfully.",
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to delete the user.",
                error: error,
            });
        }
    }
}

export default UserController;