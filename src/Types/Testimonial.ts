import type { MessageStatus } from "./common";

export interface Testimonial {
    _id: string;
    name: string;
    designation: string;
    description: string;
    image: string;
    rate: number;
    isFeatured: Boolean;
    type: "course" | "instructor";
}


export interface TestimonialResponse extends MessageStatus {
    data: {
        testimonial_data: Testimonial[];
    };
}

export interface RatingDistribution {
    rate: number;
    count: number;
}

export interface TestimonialRatingSummary {
    totalTestimonials: number;
    totalRated: number;
    unrated: number;
    averageRating: number;
    ratingDistribution: RatingDistribution[];
}

export interface TestimonialRatingSummaryResponse extends MessageStatus {
    data: TestimonialRatingSummary;
}