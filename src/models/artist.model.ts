import mongoose from "mongoose";

export type ArtistDocument = mongoose.Document & {
    name: string;
    bio: string;
    imgSrc: string;
    forFansOf: string[];
    route: string;
    isFeatured: boolean;
    links: Array<{
        icon: string;
        iconId: number;
        href: string;
    }>;
    deleted: boolean;
};

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true,
    },
    forFansOf: {
        type: Array,
    },
    route: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    links: {
        type: Array
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

/**
 * Middleware to hash password
 */

export const Artist = mongoose.model<ArtistDocument>("Artist", artistSchema);