import {NextFunction, Request, Response} from 'express';
import {Artist, ArtistDocument} from "../models/artist.model";

export const create = async (req: Request, res: Response) => {
    const artist = await new Artist(req.body);
    artist.save((err) => {
        if (err) { return res.status(400).send(err); }
        res.send(artist);
    });
}

