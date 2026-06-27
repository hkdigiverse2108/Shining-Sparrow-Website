// Types/Settings.ts

import type { BaseType } from "./common";

export interface Settings extends BaseType {
    logo: string;
    classCompleted: number;
    enrolledLearners: number;
    satisfactionRate: number;
    razorpayKey: string;
    razorpaySecret: string;
}

export interface SettingsApiResponse {
    data:
    Settings;

}