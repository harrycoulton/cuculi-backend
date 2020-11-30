import {NextFunction, Request, Response} from 'express';
import {User, UserDocument} from '../models/user.model';

export const getUserById = async (req: Request, res: Response) => {
    User.findById(req.params.id, (err, user: UserDocument) => {
        if (err) {return res.status(400).send('No user found by that ID')};
        res.send(user);
    })
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = await new User(req.body);
        user.save((err) => {
            if (err) { return res.status(400).send(err); }
            res.send(user);
        });
};