import {Request, Response} from "express";
import RoleRepository from "../repositories/RoleRepository";
import {validateModelId, validateModelSchema} from "../helpers/validateHelpers";
import {roleSchemaObject} from "../models/Role";
import UserRepository from "../repositories/UserRepository";

class RoleController {
    static async create(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(roleSchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await RoleRepository.selectOneByName(request.body.name);
            if (results.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "Role already exists.",
                });
            } else {
                const results = await RoleRepository.create(request.body);
                const role = await RoleRepository.selectOneByRoleId(results.insertId);
                return response.status(201).json({
                    status: 201,
                    statusText: "Created",
                    message: "Role created successfully.",
                    data: role[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to create the role.",
                error: error,
            });
        }
    }

    static async getAll(request: Request, response: Response) {
        try {
            const results = await RoleRepository.selectAll();
            return response.status(200).json({
                status: 200,
                statusText: "OK",
                message: "All roles fetched successfully.",
                data: results,
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get all roles.",
                error: error,
            });
        }
    }

    static async getOne(request: Request, response: Response) {
        const validateId: boolean = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        try {
            const results = await RoleRepository.selectOneByRoleId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Role not found.",
                });
            } else {
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "Role fetched successfully.",
                    data: results[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get the role.",
                error: error,
            });
        }
    }

    static async update(request: Request, response: Response) {
        const validateId: boolean = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        const validateSchema: string|true = validateModelSchema(roleSchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await RoleRepository.selectOneByRoleId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Role not found.",
                });
            } else {
                const results = await RoleRepository.selectOneByName(request.body.name);
                if (results.length > 0 && results[0].id !== Number(request.params.id)) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "Role already exists.",
                    });
                } else {
                    await RoleRepository.update(Number(request.params.id), request.body);
                    const role = await RoleRepository.selectOneByRoleId(Number(request.params.id));
                    return response.status(200).json({
                        status: 200,
                        statusText: "OK",
                        message: "Role updated successfully.",
                        data: role[0],
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the role.",
                error: error,
            });
        }
    }

    static async delete(request: Request, response: Response) {
        const validateId: boolean = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        try {
            const dependencyUserCheck = await UserRepository.selectAllByRoleId(Number(request.params.id));
            if (dependencyUserCheck.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "Role has user dependencies.",
                });
            }

            const results = await RoleRepository.delete(Number(request.params.id));
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Role not found.",
                });
            } else {
                return response.sendStatus(204);
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to delete the role.",
                error: error,
            });
        }
    }
}

export default RoleController;