import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    if (req.headers.authorization != undefined) {

        const token = req.headers.authorization.split(" ").pop();

        if (token == "null")
            return res.status(403).json("Por favor inicie sesión");

        if (!token) return res.status(401).json("Acceso denegado");

        const payload = jwt.verify(
            token,
            process.env.TOKEN_SECRET || "TokenTest"
        ) as IPayload;

        req.url = payload._id;
    }
    
    next();
}