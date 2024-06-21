import {Request, Response} from "express";
import CityRepository from "../repositories/CityRepository";
import {validateModelSchema} from "../helpers/validateModelHelpers";
import {citySchema} from "../models/City";

class CityController {
    static async create(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(citySchema, request.body);

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
                    message: "Entity already exists.",
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
        const validateSchema: string|true = validateModelSchema(citySchema, request.body);

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
                if (results.length > 0 && results[0].id !== Number(request.params.id)) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "Entity already exists.",
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
        try {
            const results = await CityRepository.delete(Number(request.params.id));
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "City not found.",
                });
            } else {
                return response.status(204).json({
                    status: 204,
                    statusText: "No Content",
                    message: "City deleted successfully.",
                });
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