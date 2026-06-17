import type { BaseType } from "./common";


export interface Instructor extends BaseType {
    name: string;
    designation: string;
    image: string;

    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
}

export interface InstructorListApiResponse {
    data: {
        instructor_data: Instructor[];
        totalData: number;
    };
}

export interface InstructorCardProps {
    instructor: Instructor;
}
