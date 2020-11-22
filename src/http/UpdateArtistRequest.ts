import {Request} from "express";

export interface UpdateArtistRequest extends Request{
    reqBody: {
        params: {
            name?: string;
            bio?: string;
            imgSrc?: string;
            forFansOf?: string[];
            route?: string;
            isFeatured?: boolean;
            links?: Array<{
                icon: string;
                iconId: number;
                href: string;
            }>;
            deleted?: boolean;
        }
    }
}