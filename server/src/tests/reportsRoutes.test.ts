import request from "supertest";
import app from "../config/app";
import Report, {ReportSchema} from "../models/Report";

const reportRequestBody1: ReportSchema = {
    enseigne: "Enseigne 1",
    description: "Description of enseigne 1",
    location: "Location of enseigne 1",
    photoUrl: "http://photo.url",
    city: 1,
    user_id: 1,
    status: "pending",
}
const reportRequestBody2: ReportSchema = {
    enseigne: "Enseigne 2",
    description: "Description of enseigne 2",
    location: "Location of enseigne 2",
    photoUrl: "http://photo.url",
    city: 1,
    user_id: 1,
    status: "pending",
}
let report1: Report;
let report2: Report;

describe('POST /reports', () => {
    it('should return 201 and the created report', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send(reportRequestBody1);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: "Created",
            message: "Report created successfully.",
            data: {
                ...reportRequestBody1,
                report_id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            },
        });
        report1 = response.body.data;
    });

    it('should return 201 and the other created report', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send(reportRequestBody2);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: "Created",
            message: "Report created successfully.",
            data: {
                ...reportRequestBody2,
                report_id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            },
        });
        report2 = response.body.data;
    });

    it('should return 400 if the enseigne has already been reported', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send(reportRequestBody1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Enseigne has already been reported.",
        });
    });

    it('should return 400 if enseigne is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                enseigne: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'enseigne' is required.",
        });
    });

    it('should return 400 if description is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                description: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'description' is required.",
        });
    });

    it('should return 400 if location is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                location: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'location' is required.",
        });
    });

    it('should return 400 if photoUrl is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                photoUrl: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'photoUrl' is required.",
        });
    });

    it('should return 400 if city is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                city: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'city' is required.",
        });
    });

    it('should return 400 if user_id is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                user_id: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'user_id' is required.",
        });
    });

    it('should return 400 if status is missing', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                status: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' is required.",
        });
    });

    it('should return 400 if enseigne is not a string', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                enseigne: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'enseigne' has an invalid type (expected string).",
        });
    });

    it('should return 400 if description is not a string', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                description: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'description' has an invalid type (expected string).",
        });
    });

    it('should return 400 if location is not a string', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                location: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'location' has an invalid type (expected string).",
        });
    });

    it('should return 400 if photoUrl is not a string', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                photoUrl: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'photoUrl' has an invalid type (expected string).",
        });
    });

    // it('should return 400 if city is not a valid city id', async () => {
    //     const response = await request.agent(app)
    //         .post('/reports')
    //         .send({
    //             ...reportToCreate,
    //             city: 0,
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'city' is not a valid city id.",
    //     });
    // });

    // it('should return 400 if user_id is not a valid user id', async () => {
    //     const response = await request.agent(app)
    //         .post('/reports')
    //         .send({
    //             ...reportToCreate,
    //             user_id: 0,
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'user_id' is not a valid user id.",
    //     });
    // });

    // it('should return 400 if status is not a valid status', async () => {
    //     const response = await request.agent(app)
    //         .post('/reports')
    //         .send({
    //             ...reportToCreate,
    //             status: "invalid",
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'status' is not a valid status.",
    //     });
    // });

    // it('should return 400 if photoUrl is not a valid url', async () => {
    //     const response = await request.agent(app)
    //         .post('/reports')
    //         .send({
    //             ...reportToCreate,
    //             photoUrl: "invalid",
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'photoUrl' is not a valid url.",
    //     });
    // });

    it('should return 400 if city is not a number', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                city: "City",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'city' has an invalid type (expected number).",
        });
    });

    it('should return 400 if user_id is not a number', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                user_id: "User",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'user_id' has an invalid type (expected number).",
        });
    });

    it('should return 400 if status is not a string', async () => {
        const response = await request.agent(app)
            .post('/reports')
            .send({
                ...reportRequestBody1,
                status: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' has an invalid type (expected string).",
        });
    });
});

describe('GET /reports', () => {
    it('should return 200 and a list of reports', async () => {
        const response = await request.agent(app)
            .get('/reports');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "All reports fetched successfully.",
            data: expect.arrayContaining<Report>([report1, report2])
        });
    });
});

describe('GET /reports/:id', () => {
    it('should return 200 and the report', async () => {
        const response = await request.agent(app)
            .get(`/reports/${report1.report_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Report fetched successfully.",
            data: report1,
        });
    });

    it('should return 404 if the report does not exist', async () => {
        const response = await request.agent(app)
            .get('/reports/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "Report not found.",
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .get('/reports/invalid');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .get('/reports/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .get('/reports/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });
});

describe('PUT /reports/:id', () => {
    it('should return 200 and the updated report', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                description: "Updated description",
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Report updated successfully.",
            data: {
                ...report1,
                description: "Updated description",
                updated_at: expect.any(String),
            },
        });
        report1 = response.body.data;
    });

    it('should return 400 if the enseigne has already been reported', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                enseigne: report2.enseigne,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Enseigne has already been reported.",
        });
    });

    it('should return 404 if the report does not exist', async () => {
        const response = await request.agent(app)
            .put('/reports/999')
            .send({
                ...report1,
                enseigne: "Updated enseigne",
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "Report not found.",
        });
    });

    it('should return 400 if the enseigne is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                enseigne: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'enseigne' is required.",
        });
    });

    it('should return 400 if the description is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                description: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'description' is required.",
        });
    });

    it('should return 400 if the location is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                location: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'location' is required.",
        });
    });

    it('should return 400 if the photoUrl is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                photoUrl: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'photoUrl' is required.",
        });
    });

    it('should return 400 if the city is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                city: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'city' is required.",
        });
    });

    it('should return 400 if the user_id is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                user_id: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'user_id' is required.",
        });
    });

    it('should return 400 if the status is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                status: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' is required.",
        });
    });

    it('should return 400 if the enseigne is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                enseigne: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'enseigne' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the description is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                description: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'description' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the location is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                location: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'location' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the photoUrl is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                photoUrl: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'photoUrl' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the city is not a number', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                city: "City",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'city' has an invalid type (expected number).",
        });
    });

    it('should return 400 if the user_id is not a number', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                user_id: "User",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'user_id' has an invalid type (expected number).",
        });
    });

    it('should return 400 if the status is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}`)
            .send({
                ...report1,
                status: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' has an invalid type (expected string).",
        });
    });

    // it('should return 400 if city is not a valid city id', async () => {
    //     const response = await request.agent(app)
    //         .put(`/reports/${report1.report_id}`)
    //         .send({
    //             ...report1,
    //             city: 0,
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'city' is not a valid city id.",
    //     });
    // });

    // it('should return 400 if user_id is not a valid user id', async () => {
    //     const response = await request.agent(app)
    //         .put(`/reports/${report1.report_id}`)
    //         .send({
    //             ...report1,
    //             user_id: 0,
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'user_id' is not a valid user id.",
    //     });
    // });

    // it('should return 400 if status is not a valid status', async () => {
    //     const response = await request.agent(app)
    //         .put(`/reports/${report1.report_id}`)
    //         .send({
    //             ...report1,
    //             status: "invalid",
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'status' is not a valid status.",
    //     });

    // it('should return 400 if photoUrl is not a valid url', async () => {
    //     const response = await request.agent(app)
    //         .put(`/reports/${report1.report_id}`)
    //         .send({
    //             ...report1,
    //             photoUrl: "invalid",
    //         });
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: "Bad Request",
    //         message: "Invalid request body. Field 'photoUrl' is not a valid url.",
    //     });
    // });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/reports/invalid')
            .send({
                ...report1,
                enseigne: "Updated enseigne",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .put('/reports/0')
            .send({
                ...report1,
                enseigne: "Updated enseigne",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .put('/reports/1.5')
            .send({
                ...report1,
                enseigne: "Updated enseigne",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .put('/reports')
            .send({
                ...report1,
                enseigne: "Updated enseigne",
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "The requested route was not found.",
        });
    });
});

describe('PUT /reports/:id/status', () => {
    it('should return 200 and the updated report', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}/status`)
            .send({
                status: "approved",
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Report status updated successfully.",
            data: {
                ...report1,
                status: "approved",
                updated_at: expect.any(String),
            },
        });
    });

    it('should return 404 if the report does not exist', async () => {
        const response = await request.agent(app)
            .put('/reports/999/status')
            .send({
                status: "approved",
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "Report not found.",
        });
    });

    it('should return 400 if the status is missing', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}/status`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' is required.",
        });
    });

    it('should return 400 if the status is not a string', async () => {
        const response = await request.agent(app)
            .put(`/reports/${report1.report_id}/status`)
            .send({
                status: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'status' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/reports/invalid/status')
            .send({
                status: "approved",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .put('/reports/0/status')
            .send({
                status: "approved",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .put('/reports/1.5/status')
            .send({
                status: "approved",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });
});

describe('DELETE /reports/:id', () => {
    it('should return 204 if the report is deleted', async () => {
        const response = await request.agent(app)
            .delete(`/reports/${report1.report_id}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 if the report does not exist', async () => {
        const response = await request.agent(app)
            .delete('/reports/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "Report not found.",
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .delete('/reports/invalid');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .delete('/reports/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .delete('/reports/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid id.",
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .delete('/reports');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "The requested route was not found.",
        });
    });
});