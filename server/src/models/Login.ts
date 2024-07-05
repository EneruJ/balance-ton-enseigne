export default interface Login {
    email: string;
    password: string;
}

export const loginSchemaObject: { [key: string]: string } = {
    email: "string",
    password: "string",
}