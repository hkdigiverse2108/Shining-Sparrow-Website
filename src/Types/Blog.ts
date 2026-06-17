import type { BaseType } from "./common";

export interface Blog extends BaseType {

    title: string;
    subTitle: string;
    content: string;

    author: string;
    category: string;

    coverImage: string;
    mainImage: string;

    quote: string | null;

    isFeatured: boolean;

}

export interface BlogListApiResponse {
    data: {
        blog_data: Blog[];
        totalData: number;
    };
}


export interface BlogApiResponse {
    data: Blog
}


export interface BlogCardProps {
    blog: Blog;
}