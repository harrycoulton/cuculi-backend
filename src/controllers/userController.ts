import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const index = (req: Request, res: Response) => {
    res.send({ greeting: 'Hello there!' });
};

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find({});
    try {
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await new User(req.body);
        user.save();
        return res.send(user);
    } catch(e) {
        return res.status(400).send(e);
    }
};