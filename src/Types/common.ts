export interface MenuItem {
  Title: string;
  link?: string;
  child?: MenuItem[];
}

export interface Params {
  [key: string]: any;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, unknown>;
}

export type AddNewsletterPayload = {
  email: string;
};

export interface UploadResponse extends MessageStatus {
  data: string[];
}

export interface BaseType {
  isUnlocked: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: string | Date;
}

export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  courseCategoryId?: string;
};