import request from "supertest";
import app from "../config/app";
import Role, {RoleSchema} from "../models/Role";

const roleRequestBody1: RoleSchema = {
    name: 'Test Role 1',
};
const roleRequestBody2: RoleSchema = {
    name: 'Test Role 2',
};
let role1: Role;
let role2: Role;

describe('POST /roles', () => {
    it('should return 201 and the created role', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send(roleRequestBody1);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'Role created successfully.',
            data: {
                ...roleRequestBody1,
                role_id: expect.any(Number),
            },
        });
        role1 = response.body.data;
    });

    it('should return 201 and the other created role', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send(roleRequestBody2);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'Role created successfully.',
            data: {
                ...roleRequestBody2,
                role_id: expect.any(Number),
            },
        });
        role2 = response.body.data;
    });

    it('should return 400 if the name is already in use', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send(roleRequestBody1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Role already exists.',
        });
    });

    it('should return 400 if the name is missing', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });

    it('should return 400 if the name is not a string', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send({
                name: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the name is empty', async () => {
        const response = await request.agent(app)
            .post('/roles')
            .send({
                name: '',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });
});

describe('GET /roles', () => {
    it('should return 200 and a list of roles', async () => {
        const response = await request.agent(app)
            .get('/roles');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'All roles fetched successfully.',
            data: expect.arrayContaining<Role>([role1, role2])
        });
    });
});

describe('GET /roles/:id', () => {
    it('should return 200 and the role', async () => {
        const response = await request.agent(app)
            .get(`/roles/${role1.role_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'Role fetched successfully.',
            data: role1,
        })
    });

    it('should return 404 if the role does not exist', async () => {
        const response = await request.agent(app)
            .get('/roles/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'Role not found.',
        })
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .get('/roles/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        })
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .get('/roles/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .get('/roles/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    })
});

describe('PUT /roles/:id', () => {
    it('should return 200 and the updated role', async () => {
        const response = await request.agent(app)
            .put(`/roles/${role1.role_id}`)
            .send({
                name: 'Updated Test Role',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'Role updated successfully.',
            data: {
                ...role1,
                name: 'Updated Test Role',
            },
        });
        role1 = response.body.data;
    });

    it('should return 400 if the name is already in use', async () => {
        const response = await request.agent(app)
            .put(`/roles/${role1.role_id}`)
            .send({
                name: role2.name,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Role already exists.',
        });
    });

    it('should return 404 if the role does not exist', async () => {
        const response = await request.agent(app)
            .put('/roles/999')
            .send({
                name: 'Test Role',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'Role not found.',
        });
    });

    it('should return 400 if the name is missing', async () => {
        const response = await request.agent(app)
            .put(`/roles/${role1.role_id}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });

    it('should return 400 if the name is not a string', async () => {
        const response = await request.agent(app)
            .put(`/roles/${role1.role_id}`)
            .send({
                name: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the name is empty', async () => {
        const response = await request.agent(app)
            .put(`/roles/${role1.role_id}`)
            .send({
                name: '',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/roles/abc')
            .send({
                name: 'Test Role',
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
            .put('/roles/0')
            .send({
                name: 'Test Role',
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
            .put('/roles/1.5')
            .send({
                name: 'Test Role',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .put('/roles')
            .send({
                name: 'Test Role',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.',
        });
    });
});

describe('DELETE /roles/:id', () => {
    it('should 204 if the role was deleted', async () => {
        const response = await request.agent(app)
            .delete(`/roles/${role1.role_id}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 if the role does not exist', async () => {
        const response = await request.agent(app)
            .delete('/roles/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'Role not found.',
        });
    });

    it('should return 400 if the role has user dependencies', async () => {
        const response = await request.agent(app)
            .delete(`/roles/1`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Role has user dependencies.',
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .delete('/roles/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .delete('/roles/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .delete('/roles/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is missing', async () => {
        const response = await request.agent(app)
            .delete('/roles');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.',
        });
    });
});