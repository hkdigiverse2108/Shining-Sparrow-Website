import type { BaseType, MessageStatus } from "./common";

export interface CourseCategory {
  name: string;
  _id: string;
  description: string;
  image: string;
  isFeatured: boolean;
}

export interface CourseCategoryResponse extends MessageStatus {
  data: {
    course_category_data: CourseCategory[];
  };
}

// export interface Course {
//   id: number;
//   title: string;
//   image: string;
//   alt: string;
//   href: string;
//   category: string;
//   categories?: string[]; // optional, since some items include it
//   excerpt: string;
//   mode: string;
//   rating: number; // 0–5 stars
//   ratingCount: number; // number of ratings
//   position: {
//     left: string;
//     top: string;
//   };
// }

export interface Course extends BaseType {
  totalLesson: number;
  classCompleted: number;
  courseCategoryId: CourseCategory;
  courseCurriculumIds: string[]; // or another interface if you have one
  description: string;
  duration: string; // e.g. "3h 20m" or change to number if it's minutes
  enrolledLearners: number;
  language: string;
  image: string; // URL
  mrpPrice?: number;
  price?: number;
  name?: string;
  purchasedCoursesShow: boolean;
  satisfactionRate: number; // e.g. percentage or rating
}

export interface CourseApiData {
  course_data: Course;
}

export interface AllCourseApiResponse {
  data: { course_data: Course[]; totalData: number };
}

export interface CourseApiResponse {
  data: Course;
}

export interface CourseCardProps {
  course: Course;
}

export interface CourseLesson {
  _id: string;
  courseId: Course | string;
  title: string;
  subtitle: string;
  priority: number;
  lessonLock: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseLessonApiResponse extends MessageStatus {
  data: {
    course_lesson_data: CourseLesson[];
  };
}

export interface CourseCurriculum {
  _id: string;
  courseId: Course | string;
  date?: string;
  thumbnail?: string;
  videoLink?: string;
  title: string;
  description: string;
  duration: string;
  attachment?: string;
  courseLessonsAssigned: CourseLesson[];
  courseLessonsPriority: number;
  curriculumLock: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseCurriculumApiResponse extends MessageStatus {
  data: {
    course_curriculum_data: CourseCurriculum[];
  };
}

export interface PurchaseCoursePayload {
  courseId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

export interface VerifyCoursePayload {
  payment_id: string;
}

export interface VerifyCourseResponse extends MessageStatus {
  data: {
    razorpayOrderId: string;
  };
}

export interface MyCourse extends BaseType {
  userId: {
    _id: string;
    fullName: string;
    email: string;
    profilePhoto: string | null;
    designation: string;
  };
  courseId: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number;
    enrolledLearners: number;
    classCompleted: number;
    satisfactionRate: number;
  };
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  isDeleted: boolean;
  purchaseDate: string;
  totalLesson: number;
}

export interface MyCourseResponse extends MessageStatus {
  data: {
    my_courses_data: MyCourse[];
    totalData: number;
  };
}
