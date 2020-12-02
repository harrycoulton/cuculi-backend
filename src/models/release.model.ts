import mongoose from "mongoose";

export type ReleaseDocument = mongoose.Document & {
    artist: number;
    title: string;
    year: Date;
    imgSrc: string;
    info: string;
    route: string;
    price: string;
    links: Array<{
        icon: string;
        iconId: number;
        href: string;
    }>;
    img: Buffer;
    relatedArtists: number[];
    deleted: boolean;
};

const releaseSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true,
    },
    imgSrc: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    links: {
        type: Array
    },
    relatedArtists: {
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

releaseSchema.methods.toJSON = function() {
    const release = this as ReleaseDocument;
    const releaseObject = release.toObject();

    delete releaseObject.img;

    return releaseObject;
}

export const Release = mongoose.model<ReleaseDocument>("Release", releaseSchema);