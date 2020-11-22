import {Request, Response} from 'express';
import {Artist, ArtistDocument} from "../models/artist.model";
import {UserDocument} from "../models/user.model";


//GET

export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find({});
        const undeleted = artists.filter((artist) => {
            return artist.deleted === false;
        })
        const deleted = artists.filter((artist) => {
            return artist.deleted === true;
        })
        res.send({
            undeleted: undeleted,
            deleted: deleted
        });
    } catch (e) {
        res.status(404).send('No artists');
    }
}

export const getAllUndeletedArtists = async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find({deleted: false});
        res.send(artists);
    } catch (e) {
        res.status(404).send('No undeleted artists');
    }
}

export const getArtistById = async (req: Request, res: Response) => {
    try {
        const artist = await Artist.findById(req.params.id);
        res.send(artist);
    } catch (e) {
        res.status(404).send('No artist found');
    }
}


//CUD

export const create = async (req: Request, res: Response) => {
    const artist = await new Artist(req.body.artist);
    artist.save((err) => {
        if (err) { return res.status(400).send(err); }
        res.send('Artist successfully created');
    });
}

export const update = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body.artistUpdate);
    console.log(updates);
    const disallowedUpdates = ['id', '_id'];
    const isValidUpdate = updates.every((update) => !disallowedUpdates.includes(update));
    if (!isValidUpdate){
        return res.status(500).send({Error: 'Invalid updates attempted'});
    }
    const artist = await Artist.findById(req.params.id, async (err) => {
        if (err) {
            return res.status(500).send('Update failed');
        }
    });
    if (artist){
        // @ts-ignore
        updates.forEach((update) => artist[update] = req.body.artistUpdate[update]);
        await artist.save();
        res.send(artist);
    } else {
        return res.status(500).send('Update failed');
    }
}

export const markDeleted = async (req: Request, res: Response) => {
    const artist = await Artist.findById(req.params.id, async (err, artist: ArtistDocument) => {
        if (err) return res.status(500).send({Error: 'Delete artist failed'});
        artist.deleted = true;
        await artist.save();
        res.send({Success: 'Artist succesfully deleted'});
    });
}

export const markUnDeleted = async (req: Request, res: Response) => {
    const artist = await Artist.findById(req.params.id, async (err, artist: ArtistDocument) => {
        if (err) return res.status(500).send({Error: 'Undelete artist failed'});
        artist.deleted = false;
        await artist.save();
        res.send({Success: 'Artist succesfully undeleted'});
    });
}

