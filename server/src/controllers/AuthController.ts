import {NextFunction, Request, Response} from "express";

class AuthController {
    static login(req: Request, res: Response, next: NextFunction) {
        res.send("Login route.");
    }

    static register(req: Request, res: Response, next: NextFunction) {
        res.send("Register route.");
    }

    static logout(req: Request, res: Response, next: NextFunction) {
        res.send("Logout route.");
    }
}

export default AuthController;