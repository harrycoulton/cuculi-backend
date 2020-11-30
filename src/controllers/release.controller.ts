import {Request, Response} from 'express';
import {Release, ReleaseDocument} from "../models/release.model";

//GET

export const getAllReleases = async (req: Request, res: Response) => {
    try {
        const releases = await Release.find({});
        const undeleted = releases.filter((release) => {
            return release.deleted === false;
        })
        const deleted = releases.filter((release) => {
            return release.deleted === true;
        })
        res.send({
            undeleted: undeleted,
            deleted: deleted
        });
    } catch (e) {
        res.status(404).send('No releases');
    }
}

export const getAllUndeletedReleases = async (req: Request, res: Response) => {
    try {
        const releases = await Release.find({deleted: false});
        res.send(releases);
    } catch (e) {
        res.status(404).send('No undeleted releases');
    }
}

export const getReleaseById = async (req: Request, res: Response) => {
    try {
        const release = await Release.findById(req.params.id);
        res.send(release);
    } catch (e) {
        res.status(404).send('No release found');
    }
}


//CUD

export const create = async (req: Request, res: Response) => {
    const release = await new Release(req.body.release);
    release.save((err) => {
        if (err) { return res.status(400).send(err); }
        res.send('Release successfully created');
    });
}

export const update = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body.releaseUpdate);
    const disallowedUpdates = ['id', '_id'];
    const isValidUpdate = updates.every((update) => !disallowedUpdates.includes(update));
    if (!isValidUpdate){
        return res.status(500).send({Error: 'Invalid updates attempted'});
    }
    const release = await Release.findById(req.params.id, async (err) => {
        if (err) {
            return res.status(500).send('Release not found');
        }
    });
    if (release){
        // @ts-ignore
        updates.forEach((update) => release[update] = req.body.releaseUpdate[update]);
        await release.save();
        res.send(release);
    } else {
        return res.status(500).send('Update failed');
    }
}

export const markDeleted = async (req: Request, res: Response) => {
    const release = await Release.findById(req.params.id, async (err, release: ReleaseDocument) => {
        if (err) return res.status(500).send({Error: 'Delete release failed'});
        release.deleted = true;
        await release.save();
        res.send({Success: 'Release succesfully deleted'});
    });
}

export const markUnDeleted = async (req: Request, res: Response) => {
    const release = await Release.findById(req.params.id, async (err, release: ReleaseDocument) => {
        if (err) return res.status(500).send({Error: 'Undelete release failed'});
        release.deleted = false;
        await release.save();
        res.send({Success: 'Release succesfully undeleted'});
    });
}

