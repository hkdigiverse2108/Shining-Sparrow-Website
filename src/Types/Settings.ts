// Types/Settings.ts

import type { BaseType } from "./common";

export interface SocialMediaLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export interface Settings extends BaseType {
    address: string;
    email: string;
    phoneNumber: string;
    link: string;

    logo: string;

    classCompleted: number;
    enrolledLearners: number;
    satisfactionRate: number;

    razorpayKey: string;
    razorpaySecret: string;

    socialMediaLinks: SocialMediaLinks;
}

export interface SettingsApiResponse {
    data:
    Settings;

}