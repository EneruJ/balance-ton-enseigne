import {Request, Response} from "express";
import ReportRepository from "../repositories/ReportRepository";
import {validateModelId, validateModelSchema} from "../helpers/validateHelpers";
import {reportSchemaObject} from "../models/Report";

class ReportController {
    static async create(request: Request, response: Response) {
        const validateSchema: string|true = validateModelSchema(reportSchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await ReportRepository.selectOneByEnseigne(request.body.enseigne);
            if (results.length > 0) {
                return response.status(400).json({
                    status: 400,
                    statusText: "Bad Request",
                    message: "Enseigne has already been reported.",
                });
            } else {
                const results = await ReportRepository.create(request.body);
                const report = await ReportRepository.selectOneByReportId(results.insertId);
                return response.status(201).json({
                    status: 201,
                    statusText: "Created",
                    message: "Report created successfully.",
                    data: report[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to create the report.",
                error: error,
            });
        }
    }

    static async getAll(request: Request, response: Response) {
        try {
            const results = await ReportRepository.selectAll();
            return response.status(200).json({
                status: 200,
                statusText: "OK",
                message: "All reports fetched successfully.",
                data: results,
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get all reports.",
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
            const results = await ReportRepository.selectOneByReportId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Report not found.",
                });
            } else {
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "Report fetched successfully.",
                    data: results[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to get the report.",
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

        const validateSchema: string|true = validateModelSchema(reportSchemaObject, request.body);
        if (validateSchema !== true) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: validateSchema,
            });
        }

        try {
            const results = await ReportRepository.selectOneByReportId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Report not found.",
                });
            } else {
                const results = await ReportRepository.selectOneByEnseigne(request.body.enseigne);
                if (results.length > 0 && results[0].report_id !== Number(request.params.id)) {
                    return response.status(400).json({
                        status: 400,
                        statusText: "Bad Request",
                        message: "Enseigne has already been reported.",
                    });
                } else {
                    await ReportRepository.update(Number(request.params.id), request.body);
                    const report = await ReportRepository.selectOneByReportId(Number(request.params.id));
                    return response.status(200).json({
                        status: 200,
                        statusText: "OK",
                        message: "Report updated successfully.",
                        data: report[0],
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the report.",
                error: error,
            });
        }
    }

    static async updateStatus(request: Request, response: Response) {
        const validateId = validateModelId(request.params.id);
        if (!validateId) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid id.",
            });
        }

        if (!request.body.status) {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid request body. Field 'status' is required.",
            });
        }

        if(typeof request.body.status !== "string") {
            return response.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid request body. Field 'status' has an invalid type (expected string).",
            });
        }

        try {
            const results = await ReportRepository.selectOneByReportId(Number(request.params.id));
            if (results.length === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Report not found.",
                });
            } else {
                await ReportRepository.updateStatus(Number(request.params.id), request.body.status);
                const report = await ReportRepository.selectOneByReportId(Number(request.params.id));
                return response.status(200).json({
                    status: 200,
                    statusText: "OK",
                    message: "Report status updated successfully.",
                    data: report[0],
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to update the report status.",
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
            const results = await ReportRepository.delete(Number(request.params.id));
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: "Report not found.",
                });
            } else {
                return response.sendStatus(204);
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                statusText: "Internal Server Error",
                message: "An error occurred while trying to delete the report.",
                error: error,
            });
        }
    }
}

export default ReportController;