import type { BaseType } from "./common";

export interface Gallery extends BaseType {
    title: string;
    description: string;
    images: string[];
}

export interface GalleryListApiResponse {
    data: {
        gallery_data: Gallery[];
    };
}