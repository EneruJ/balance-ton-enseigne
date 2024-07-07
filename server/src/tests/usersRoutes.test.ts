import request from 'supertest';
import app from "../config/app";
import User, {CreateUserSchema} from "../models/User";
import {removeUserPassword} from "../helpers/passwordHelper";

const userRequestBody1: CreateUserSchema = {
    name: 'John Doe',
    email: 'john.doe@email.test',
    password: 'password',
    city: 1,
    role: 2
};
const userRequestBody2: CreateUserSchema = {
    name: 'Jane Doe',
    email: 'jane.doe@email.test',
    password: 'password',
    city: 1,
    role: 2
};
let user1: User;
let user2: User;

describe('POST /users', () => {
    it('should return 201 and the created user', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send(userRequestBody1);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'User created successfully.',
            data: {
                ...removeUserPassword(userRequestBody1 as User),
                user_id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            },
        });
        user1 = response.body.data;
    });

    it('should return 201 and the other created user', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send(userRequestBody2);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'User created successfully.',
            data: {
                ...removeUserPassword(userRequestBody2 as User),
                user_id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            },
        });
        user2 = response.body.data;
    });

    it('should return 400 if name is missing', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                name: undefined
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'name\' is required.',
        });
    });

    it('should return 400 if email is missing', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                email: undefined
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'email\' is required.',
        });
    });

    it('should return 400 if password is missing', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                password: undefined
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'password\' is required.',
        });
    });

    it('should return 400 if city is missing', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                city: undefined
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'city\' is required.',
        });
    });

    it('should return 400 if role is missing', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                role: undefined
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'role\' is required.',
        });
    });

    it('should return 400 if name is not a string', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                name: 123
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'name\' has an invalid type (expected string).',
        });
    });

    it('should return 400 if email is not a string', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                email: 123
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'email\' has an invalid type (expected string).',
        });
    });

    it('should return 400 if password is not a string', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                password: 123
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'password\' has an invalid type (expected string).',
        });
    });

    it('should return 400 if city is not a number', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                city: 'invalid'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'city\' has an invalid type (expected number).',
        });
    });

    it('should return 400 if role is not a number', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send({
                ...userRequestBody1,
                role: 'invalid'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'role\' has an invalid type (expected number).',
        });
    });

    it('should return 400 if email is already used', async () => {
        const response = await request.agent(app)
            .post('/users')
            .send(userRequestBody1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Email is already used.',
        });
    });
});

describe('GET /users', () => {
    it('should return 200 and a list of users', async () => {
        const response = await request.agent(app)
            .get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'All users fetched successfully.',
            data: expect.arrayContaining<User>([user1, user2])
        });
    });
});

describe('GET /users/:id', () => {
    it('should return 200 and the user', async () => {
        const response = await request.agent(app)
            .get(`/users/${user1.user_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'User fetched successfully.',
            data: user1
        });
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request.agent(app)
            .get('/users/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.'
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .get('/users/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .get('/users/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .get('/users/1.1');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });
});

describe('GET /users/:id/reports', () => {
    it('should return 200 and user reports', async () => {
        const response = await request.agent(app)
            .get(`/users/1/reports`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'User reports fetched successfully.',
            data: expect.arrayContaining<Report>(response.body.data)
        });
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request.agent(app)
            .get('/users/999/reports');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.'
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .get('/users/abc/reports');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .get('/users/0/reports');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id not a integer', async () => {
        const response = await request.agent(app)
            .get('/users/1.1/reports');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });
});

describe('PUT /users/:id', () => {
    it('should return 200 and the updated user', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'User updated successfully.',
            data: {
                ...user1,
                name: 'John Doe Updated',
                updated_at: expect.any(String),
            }
        });
        user1 = response.body.data;
    });

    it('should return 400 if email is already used', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                email: user2.email
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Email is already used.',
        });
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request.agent(app)
            .put('/users/999')
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.'
        });
    });

    it('should return 400 if name is missing', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                name: undefined
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'name\' is required.'
        });
    });

    it('should return 400 if email is missing', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                email: undefined
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'email\' is required.'
        });
    });

    it('should return 400 if city is missing', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                city: undefined
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'city\' is required.'
        });
    });

    it('should return 400 if role is missing', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                role: undefined
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'role\' is required.'
        });
    });

    it('should return 400 if name is not a string', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                name: 123
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'name\' has an invalid type (expected string).'
        });
    });

    it('should return 400 if email is not a string', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                email: 123
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'email\' has an invalid type (expected string).'
        });
    });

    it('should return 400 if city is not a number', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                city: 'invalid'
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'city\' has an invalid type (expected number).'
        });
    });

    it('should return 400 if role is not a number', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}`)
            .send({
                ...user1,
                role: 'invalid'
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'role\' has an invalid type (expected number).'
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/users/abc')
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .put('/users/0')
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .put('/users/1.1')
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.'
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .put('/users/')
            .send({
                ...user1,
                name: 'John Doe Updated',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.'
        });
    });
});

describe('PUT /users/:id/password', () => {
    it('should return 200 and update user password', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}/password`)
            .send({
                password: 'newpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'User password updated successfully.',
        });
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request.agent(app)
            .put('/users/999/password')
            .send({
                password: 'newpassword'
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.',
        });
    });

    it('should return 400 if password is missing', async () => {
        const response = await request.agent(app)
            .put(`/users/${user1.user_id}/password`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid request body. Field \'password\' is required.',
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/users/abc/password')
            .send({
                password: 'newpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .put('/users/0/password')
            .send({
                password: 'newpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .put('/users/1.1/password')
            .send({
                password: 'newpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });
});

describe('DELETE /users/:id', () => {
    it('should return 204 if user is deleted', async () => {
        const response = await request.agent(app)
            .delete('/users/' + user1.user_id);

        expect(response.status).toBe(204);
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request.agent(app)
            .delete('/users/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.',
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .delete('/users/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .delete('/users/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .delete('/users/1.1');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .delete('/users/');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.',
        });
    });
});