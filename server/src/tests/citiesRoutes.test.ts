import request from "supertest";
import app from "../config/app";
import City, {CitySchema} from "../models/City";

const cityRequestBody1: CitySchema = {
    name: 'City Name',
    state: 'City State',
    country: 'City Country',
    postal_code: '12345-678',
    latitude: "123",
    longitude: "456",
    timezone: 'City Timezone',
    population: "123456",
    area: "123456",
    details: 'City Details',
};
const cityRequestBody2: CitySchema = {
    name: 'Another City Name',
    state: 'Another City State',
    country: 'Another City Country',
    postal_code: '98765-432',
    latitude: "654",
    longitude: "321",
    timezone: 'Another City Timezone',
    population: "654321",
    area: "654321",
    details: 'Another City Details',
};
let city1: City;
let city2: City;

describe('POST /cities', () => {
    it('should return 201 and the created city', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send(cityRequestBody1);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'City created successfully.',
            data: {
                ...cityRequestBody1,
                city_id: expect.any(Number),
            },
        });
        city1 = response.body.data;
    });

    it('should return 201 and the other created city', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send(cityRequestBody2);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 201,
            statusText: 'Created',
            message: 'City created successfully.',
            data: {
                ...cityRequestBody2,
                city_id: expect.any(Number),
            },
        });
        city2 = response.body.data;
    });

    it('should return 400 if the postal code is already in use', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send(cityRequestBody1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'City already exists.',
        });
    });

    it('should return 400 if the name is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                name: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });

    it('should return 400 if the state is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                state: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'state' is required.",
        });
    });

    it('should return 400 if the country is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                country: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'country' is required.",
        });
    });

    it('should return 400 if the postal code is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                postal_code: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'postal_code' is required.",
        });
    });

    it('should return 400 if the latitude is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                latitude: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'latitude' is required.",
        });
    });

    it('should return 400 if the longitude is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                longitude: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'longitude' is required.",
        });
    });

    it('should return 400 if the timezone is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                timezone: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'timezone' is required.",
        });
    });

    it('should return 400 if the population is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                population: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'population' is required.",
        });
    });

    it('should return 400 if the area is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                area: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'area' is required.",
        });
    });

    it('should return 400 if the details is missing', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                details: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'details' is required.",
        });
    });

    it('should return 400 if the name is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                name: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the state is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                state: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'state' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the country is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                country: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'country' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the postal code is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                postal_code: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'postal_code' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the latitude is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                latitude: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'latitude' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the longitude is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                longitude: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'longitude' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the timezone is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                timezone: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'timezone' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the population is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                population: 123456,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'population' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the area is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                area: 123456,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'area' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the details is not a string', async () => {
        const response = await request.agent(app)
            .post('/cities')
            .send({
                ...cityRequestBody1,
                details: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'details' has an invalid type (expected string).",
        });
    });
});

describe('GET /cities', () => {
    it('should return 200 and a list of cities', async () => {
        const response = await request.agent(app)
            .get('/cities');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'All cities fetched successfully.',
            data: expect.arrayContaining<City>([city1, city2])
        });
    });
});

describe('GET /cities/:id', () => {
    it('should return 200 and the city', async () => {
        const response = await request.agent(app)
            .get(`/cities/${city1.city_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'City fetched successfully.',
            data: city1,
        });
    });

    it('should return 404 if the city does not exist', async () => {
        const response = await request.agent(app)
            .get('/cities/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'City not found.',
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .get('/cities/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .get('/cities/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .get('/cities/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });
});

describe('PUT /cities/:id', () => {
    it('should return 200 and the updated city', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                name: 'Updated City Name',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: 'OK',
            message: 'City updated successfully.',
            data: {
                ...city1,
                name: 'Updated City Name',
            },
        });
        city1 = response.body.data;
    });

    it('should return 400 if the postal code is already in use', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                postal_code: city2.postal_code,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'City already exists.',
        });
    });

    it('should return 404 if the city does not exist', async () => {
        const response = await request.agent(app)
            .put('/cities/999')
            .send({
                ...city1,
                name: 'Updated City Name',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'City not found.',
        });
    });

    it('should return 400 if the name is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                name: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' is required.",
        });
    });

    it('should return 400 if the state is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                state: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'state' is required.",
        });
    });

    it('should return 400 if the country is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                country: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'country' is required.",
        });
    });

    it('should return 400 if the postal code is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                postal_code: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'postal_code' is required.",
        });
    });

    it('should return 400 if the latitude is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                latitude: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'latitude' is required.",
        });
    });

    it('should return 400 if the longitude is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                longitude: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'longitude' is required.",
        });
    });

    it('should return 400 if the timezone is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                timezone: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'timezone' is required.",
        });
    });

    it('should return 400 if the population is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                population: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'population' is required.",
        });
    });

    it('should return 400 if the area is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                area: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'area' is required.",
        });
    });

    it('should return 400 if the details is missing', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                details: undefined,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'details' is required.",
        });
    });

    it('should return 400 if the name is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                name: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'name' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the state is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                state: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'state' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the country is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                country: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'country' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the postal code is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                postal_code: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'postal_code' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the latitude is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                latitude: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'latitude' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the longitude is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                longitude: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'longitude' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the timezone is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                timezone: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'timezone' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the population is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                population: 123456,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'population' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the area is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                area: 123456,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'area' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the details is not a string', async () => {
        const response = await request.agent(app)
            .put(`/cities/${city1.city_id}`)
            .send({
                ...city1,
                details: 123,
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: "Invalid request body. Field 'details' has an invalid type (expected string).",
        });
    });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .put('/cities/abc')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .put('/cities/0')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .put('/cities/1.5')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .put('/cities')
            .send({});

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.',
        });
    });
});

describe('DELETE /cities/:id', () => {
    it('should return 204 if the city was deleted', async () => {
        const response = await request.agent(app)
            .delete(`/cities/${city1.city_id}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 if the city does not exist', async () => {
        const response = await request.agent(app)
            .delete('/cities/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'City not found.',
        });
    });

    // it('should return 400 if the city has user dependencies', async () => {
    //     const response = await request.agent(app)
    //         .delete('/cities/2');
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: 'Bad Request',
    //         message: 'City has user dependencies.',
    //     });
    // });

    // it('should return 400 if the city has report dependencies', async () => {
    //     const response = await request.agent(app)
    //         .delete('/cities/1');
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({
    //         status: 400,
    //         statusText: 'Bad Request',
    //         message: 'City has report dependencies.',
    //     });
    // });

    it('should return 400 if the id is not a number', async () => {
        const response = await request.agent(app)
            .delete('/cities/abc');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is less than 1', async () => {
        const response = await request.agent(app)
            .delete('/cities/0');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 400 if the id is not an integer', async () => {
        const response = await request.agent(app)
            .delete('/cities/1.5');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Invalid id.',
        });
    });

    it('should return 404 if the id is missing', async () => {
        const response = await request.agent(app)
            .delete('/cities');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 404,
            statusText: 'Not Found',
            message: 'The requested route was not found.',
        });
    });
});