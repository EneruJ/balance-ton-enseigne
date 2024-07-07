import request from "supertest";
import app from "../config/app";
import {UserWithoutPassword} from "../models/User";

const loginRequestBody = {
    email: "test.user.login@email.test",
    password: "testpassword",
}
let user: UserWithoutPassword;
let token: string;

beforeAll(async () => {
    user = (await request.agent(app)
        .post('/users')
        .send({
            name: 'Test User Login',
            email: loginRequestBody.email,
            password: loginRequestBody.password,
            city: 1,
            role: 1,
        })).body.data;
});

describe('POST /auth/login', () => {
    it('should return 200 and a user with a token', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send(loginRequestBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Login successful.",
            data: {
                user: user,
                token: expect.any(String),
            },
        });
        token = response.body.data.token;
    });

    it('should return 401 if the password is wrong', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                email: loginRequestBody.email,
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: 401,
            statusText: "Unauthorized",
            message: "Invalid password.",
        });
    });

    it('should return 404 if the user does not exist', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                email: 'nonexistentuser',
                password: loginRequestBody.password,
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: "Not Found",
            message: "User not found.",
        });
    });

    it('should return 400 if the email is missing', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                password: loginRequestBody.password,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'email' is required.",
        });
    });

    it('should return 400 if the password is missing', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                email: loginRequestBody.email,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'password' is required.",
        });
    });

    it('should return 400 if the email is not a string', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                email: 123,
                password: loginRequestBody.password,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'email' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the password is not a string', async () => {
        const response = await request.agent(app)
            .post('/auth/login')
            .send({
                email: loginRequestBody.email,
                password: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: "Bad Request",
            message: "Invalid request body. Field 'password' has an invalid type (expected string).",
        });
    });
});

describe('GET /auth/current', () => {
    it('should return 200 and the current user', async () => {
        const response = await request.agent(app)
            .get('/auth/current')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "OK",
            message: "Current user fetched successfully.",
            data: user,
        });
    });

    // it('should return 401 if the token is invalid', async () => {
    //     const response = await request.agent(app).get('/auth/current').set('Authorization', `Bearer invalidtoken`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });
    // });

    // it('should return 401 if the token is missing', async () => {
    //     const response = await request.agent(app).get('/auth/current');
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Missing token.",
    //     });
    // });

    // it('should return 401 if the token is empty', async () => {
    //     const response = await request.agent(app).get('/auth/current').set('Authorization', `Bearer `);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });
    // });

    // it('should return 401 if the token is not a string', async () => {
    //     const response = await request.agent(app).get('/auth/current').set('Authorization', `Bearer 123`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });
    // });

    // it('should return 401 if the token is not prefixed with Bearer', async () => {
    //     const response = await request.agent(app).get('/auth/current').set('Authorization', `123`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });
    // });
});

describe('GET /auth/logout', () => {
    it('should return 204 if the user is logged out', async () => {
        const response = await request.agent(app)
            .get('/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });

    // it('should return 401 if the token is invalid', async () => {
    //     const response = await request.agent(app).get('/auth/logout').set('Authorization
    //     ', `Bearer invalidtoken`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });

    // it('should return 401 if the token is missing', async () => {
    //     const response = await request.agent(app).get('/auth/logout');
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Missing token.",
    //     });

    // it('should return 401 if the token is empty', async () => {
    //     const response = await request.agent(app).get('/auth/logout').set('Authorization', `Bearer `);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });

    // it('should return 401 if the token is not a string', async () => {
    //     const response = await request.agent(app).get('/auth/logout').set('Authorization
    //     ', `Bearer 123`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });

    // it('should return 401 if the token is not prefixed with Bearer', async () => {
    //     const response = await request.agent(app).get('/auth/logout').set('Authorization
    //     ', `123`);
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual({
    //         status: 401,
    //         statusText: "Unauthorized",
    //         message: "Invalid token.",
    //     });
});