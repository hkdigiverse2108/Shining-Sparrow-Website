import type { BaseType } from "./common";

export interface SocialMediaLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export interface PhoneNumber {
  number: string;
  label: string;
}

export interface ContactUs extends BaseType {
  phoneNumbers: PhoneNumber[];
  email: string;
  address: string;
  workingHours: string;
  socialMediaLinks: SocialMediaLinks;
}

export interface ContactUsApiResponse {
  data: ContactUs;
}
