import type { MessageStatus } from "./common";

export interface FaqItem {
  q: string;
  a: string;
}

export type FaqCategory =
  | "general"
  | "regular"
  | "advanced"
  | "policies"
  | "payment"
  | "terms";

export type FaqData = Record<FaqCategory, FaqItem[]>;


export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  type: "course" | "workshop"; // safe union
  isFeatured: boolean;

}


export interface FaqResponse extends MessageStatus {
  data: {
    faq_data: FaqItem[];
  };
}