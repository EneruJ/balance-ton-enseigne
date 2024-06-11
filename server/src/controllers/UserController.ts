import {Request, Response, NextFunction} from "express";

class UserController {
    static createUser(req: Request, res: Response, next: NextFunction) {
        res.send("Create user route.");
    }

    static getAllUsers(req: Request, res: Response, next: NextFunction) {
        res.send("Get all users route.");
    }

    static getUser(req: Request, res: Response, next: NextFunction) {
        res.send("Get user route.");
    }

    static updateUser(req: Request, res: Response, next: NextFunction) {
        res.send("Update user route.");
    }

    static deleteUser(req: Request, res: Response, next: NextFunction) {
        res.send("Delete user route.");
    }
}

export default UserController;