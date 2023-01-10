import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send('Unauthorized');
        }

        const token = authHeader.split(' ')[1];

        try{
            //For now just checking if autheader is present or not in request or not for authentication of request.
            if(token){
               req.params.user = "authorizedUser";
            }
        }catch(error){
            return res.status(401).send('Unauthorized');
        }
        next();
    }
}
