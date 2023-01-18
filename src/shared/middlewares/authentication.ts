import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }

        const token = authHeader.split(' ')[1];

        try {
            //For now just checking if autheader is present or not in request or not for authentication of request. 
            //But here more logic can be added verifying tokens with JWT or any other authentication techniques.
            //Even based on token user information can be fetched and based on user details can be forwarded to requests and user roles can be set for further authorization in guards
            if (token) {
                req.user = { role: 'validuser' }
            }
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }
        next();
    }
}

interface IRequest extends Request {
    user: any;
}
