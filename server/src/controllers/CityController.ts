import {Request, Response} from "express";
import CityRepository from "../repositories/CityRepository";
import {validateModelId, validateModelSchema} from "../helpers/validateHelpers";
import {citySchemaObject} from "../models/City";
import UserRepository from "../repositories/UserRepository";
import ReportRepository from "../repositories/ReportRepository";

class CityController {
    static async create(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(citySchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await CityRepository.selectOneByPostalCode(request.body.postal_code);
            if (results.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "City already exists.",
                });
            } else {
                const results = await CityRepository.create(request.body);
                const city = await CityRepository.selectOneByCityId(results.insertId);
                return response.status(201).json({
                    status: 201,
                    statusText: "Created",
                    message: "City created successfully.",
                    data: city[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to create the city.",
                error: error,
            });
        }
    }

    static async getAll(request: Request, response: Response) {
        try {
            const results = await CityRepository.selectAll();
            return response.status(200).json({
                status: 200,
                statusText: "OK",
                message: "All cities fetched successfully.",
                data: results,
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get all cities.",
                error: error,
            });
        }
    }

    static async getOne(request: Request, response: Response) {
        const validateId = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        try {
            const results = await CityRepository.selectOneByCityId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "City not found.",
                });
            } else {
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "City fetched successfully.",
                    data: results[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get the city.",
                error: error,
            });
        }
    }

    static async update(request: Request, response: Response) {
        const validateId = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        const validateSchema: string|true = validateModelSchema(citySchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await CityRepository.selectOneByCityId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "City not found.",
                });
            } else {
                const results = await CityRepository.selectOneByPostalCode(request.body.postal_code);
                if (results.length > 0 && results[0].city_id !== Number(request.params.id)) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "City already exists.",
                    });
                } else {
                    await CityRepository.update(Number(request.params.id), request.body);
                    const city = await CityRepository.selectOneByCityId(Number(request.params.id));
                    return response.status(200).json({
                        status: 200,
                        statusText: "OK",
                        message: "City updated successfully.",
                        data: city[0],
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the city.",
                error: error,
            });
        }
    }

    static async delete(request: Request, response: Response) {
        const validateId = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        try {
            const dependencyUserCheck = await UserRepository.selectAllByCityId(Number(request.params.id));
            if (dependencyUserCheck.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "City has user dependencies.",
                });
            } else {
                const dependencyReportCheck = await ReportRepository.selectAllByCityId(Number(request.params.id));
                if (dependencyReportCheck.length > 0) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "City has report dependencies.",
                    });
                }
            }

            const results = await CityRepository.delete(Number(request.params.id));
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "City not found.",
                });
            } else {
                return response.sendStatus(204);
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to delete the city.",
                error: error,
            });
        }
    }
}

export default CityController;