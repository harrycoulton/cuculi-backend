import {Request, Response} from 'express';
import {Story, StoryDocument} from "../models/story.model";

//GET

export const getAllStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({});
        const undeleted = stories.filter((story) => {
            return story.deleted === false;
        })
        const deleted = stories.filter((story) => {
            return story.deleted === true;
        })
        res.send({
            undeleted: undeleted,
            deleted: deleted
        });
    } catch (e) {
        res.status(404).send('No stories');
    }
}

export const getAllUndeletedStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({deleted: false});
        res.send(stories);
    } catch (e) {
        res.status(404).send('No undeleted stories');
    }
}

export const getStoryById = async (req: Request, res: Response) => {
    try {
        const story = await Story.findById(req.params.id);
        res.send(story);
    } catch (e) {
        res.status(404).send('No story found');
    }
}


//CUD

export const create = async (req: Request, res: Response) => {
    const story = await new Story(req.body.story);
    story.save((err) => {
        if (err) { return res.status(400).send(err); }
        res.send('Story successfully created');
    });
}

export const update = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body.storyUpdate);
    const disallowedUpdates = ['id', '_id'];
    const isValidUpdate = updates.every((update) => !disallowedUpdates.includes(update));
    if (!isValidUpdate){
        return res.status(500).send({Error: 'Invalid updates attempted'});
    }
    const story = await Story.findById(req.params.id, async (err) => {
        if (err) {
            return res.status(500).send('Story not found');
        }
    });
    if (story){
        // @ts-ignore
        updates.forEach((update) => story[update] = req.body.storyUpdate[update]);
        await story.save();
        res.send(story);
    } else {
        return res.status(500).send('Update failed');
    }
}

export const markDeleted = async (req: Request, res: Response) => {
    const story = await Story.findById(req.params.id, async (err, story: StoryDocument) => {
        if (err) return res.status(500).send({Error: 'Delete story failed'});
        story.deleted = true;
        await story.save();
        res.send({Success: 'Story succesfully deleted'});
    });
}

export const markUnDeleted = async (req: Request, res: Response) => {
    const story = await Story.findById(req.params.id, async (err, story: StoryDocument) => {
        if (err) return res.status(500).send({Error: 'Undelete story failed'});
        story.deleted = false;
        await story.save();
        res.send({Success: 'Story succesfully undeleted'});
    });
}

