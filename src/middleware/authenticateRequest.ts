import {NextFunction, Request, Response} from "express";
import {User, UserDocument} from '../models/user.model';
const jwt = require('jsonwebtoken');

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.APP_KEY);
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.accessToken': token });
        if (!user){
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(401).send({"Error": "User not authenticated. Please log in."});
    }
}