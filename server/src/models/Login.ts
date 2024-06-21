export default interface Login {
    email: string;
    password: string;
}

export const loginSchema: { [key: string]: string } = {
    email: "string",
    password: "string",
}