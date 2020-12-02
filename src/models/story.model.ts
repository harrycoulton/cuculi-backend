import mongoose from "mongoose";

export type StoryDocument = mongoose.Document & {
    heading: string;
    quote?: string;
    text: string;
    imgSrc: string;
    imgDesc: string;
    isFeatured: boolean;
    route: string;
    relatedStories: string[];
    relatedArtists: string[];
    relatedReleases: string[];
    img: Buffer;
    deleted: boolean;
};

const storySchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        required: true
    },
    imgDesc: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    relatedStories: {
        type: Array
    },
    relatedArtists: {
        type: Array
    },
    relatedReleases: {
        type: Array
    },
    img: {
        type: Buffer
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

storySchema.methods.toJSON = function (){
    const story = this as StoryDocument;
    const storyObject = story.toObject();

    delete storyObject.img;

    return storyObject;
}

export const Story = mongoose.model<StoryDocument>("Story", storySchema);