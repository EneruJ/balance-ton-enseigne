export const validateModelSchema = (schema: any, data: any): string|true => {
    for (const key in schema) {
        if (!data[key]) {
            return `Invalid request body. Field '${key}' is required.`;
        }

        if (typeof data[key] !== schema[key]) {
            return `Invalid request body. Field '${key}' has an invalid type (expected ${schema[key]}).`;
        }
    }

    return true;
}

export const  validateModelId = (id: string): boolean => {
    return !isNaN(Number(id)) && Number.isInteger(Number(id))  && Number(id) > 0;
}