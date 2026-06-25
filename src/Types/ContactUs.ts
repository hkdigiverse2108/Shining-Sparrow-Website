import type { BaseType } from "./common";
import type { SocialMediaLinks } from "./Settings";

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
