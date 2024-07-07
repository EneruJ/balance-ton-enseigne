import request from "supertest";
import app from "../config/app";

describe('GET /', () => {
    it('should return 200 and a welcome message', async () => {
        const response = await request.agent(app)
            .get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Welcome to the API.",
        });
    });
});

describe('GET /nonexistent', () => {
    it('should return 404 and a not found route message', async () => {
        const response = await request.agent(app)
            .get('/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "The requested route was not found.",
        });
    });
});