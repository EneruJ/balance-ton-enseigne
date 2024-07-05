import request from 'supertest';
import app from "../../config/app";

describe('GET /users', () => {
    it('should return a list of users', async () => {
        const response = await request.agent(app).get('/users');
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
    });
});