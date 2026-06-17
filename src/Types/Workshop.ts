import type { BaseType, MessageStatus } from "./common";

export interface Workshop extends BaseType {
  image: string;
  title: string;
  subTitle: string;
  about: string;
  pdfAttach?: string;
  workshopCurriculum: any[];
  workshopTestimonials: any[];
  workshopFAQ: any[];
  price: number;
  mrpPrice: number;
  validFor?: string;
  language: string;
  duration: string;
  isDeleted: boolean;
  isBlocked: boolean;
  isUnlocked: boolean;
}

export interface AllWorkshopApiResponse extends MessageStatus {
  data: {
    workshop_data: Workshop[];
    totalData: number;
    state: {
      page: number;
      limit: number;
      page_limit: number;
    };
  };
}

export interface WorkshopApiResponse extends MessageStatus {
  data: Workshop;
}

export interface WorkshopCurriculum extends BaseType {
  workshopId: Workshop | string;
  date: string;
  thumbnail: string;
  videoLink: string;
  title: string;
  description: string;
  duration: string;
  attachment?: string;
  priority: number;
  isDeleted: boolean;
  isBlocked: boolean;
}

export interface WorkshopCurriculumApiResponse extends MessageStatus {
  data: {
    workshop_curriculum_data: WorkshopCurriculum[];
    totalData: number;
    state: {
      page: number;
      limit: number;
      page_limit: number;
    };
  };
}

export interface PurchaseWorkshopPayload {
  workshopId: string;
  amount: number;
  paymentId: string;
  paymentMethod: string;
  finalAmount: number;
}
