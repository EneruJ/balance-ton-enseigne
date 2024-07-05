import {RoleSchema} from "../models/Role";

export function generateRoles(): RoleSchema[] {
    return [
        {
            name: "admin",
        },
        {
            name: "user",
        },
    ];
}