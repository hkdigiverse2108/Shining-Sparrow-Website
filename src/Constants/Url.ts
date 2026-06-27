export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const URL_KEYS = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/signup",
    FORGOT_PASSWORD: "auth/forgot-password",
    VERIFY_OTP: "auth/otp/verify",
    RESEND_OTP: "auth/resend-otp",
    RESET_PASSWORD: "auth/reset-password",
    CHANGE_PASSWORD: "auth/change-password",
  },
  NEWSLETTER: {
    ADD: "newsletter/add",
  },
  CONTACT: {
    ADD: "get-in-touch/add",
  },
  FRANCHISE: {
    ADD: "franchise-inquiry/add",
  },
  CONTACT_US: {
    ALL: "contact-us/all",
  },
  BLOG: {
    ALL: "blog/all",
    ONE: "blog/",
  },
  HERO_BANNER: { ALL: "hero-banner/all?type=web" },
  COURSE_CATEGORY: { ALL: "course-category/all" },
  TESTIMONIALS: {
    ALL: "testimonial/all",
    RATINGS_SUMMARY: "testimonial/ratings/summary",
  },
  FAQ: { ALL: "faq/all" },
  TRUSTED_PARTNER: { ALL: "trusted-partner/all" },
  COURSE: {
    ALL: "course/all",
    ONE: "course/",
    CURRICULUM: "course-curriculum/all?courseId=",
    LESSON: "course-lesson/all?courseId=",
    CURRICULUM_BY_LESSON: "course-curriculum/all?courseLessonId=",
    PURCHASE: "course/purchase",
    VERIFY: "course/verify",
    MY_COURSES: "course/my-courses",
  },
  INSTRUCTOR: { ALL: "instructor/all" },
  LEGALITY: "legality",
  SETTINGS: "settings/all",
  GALLARY: "gallery/all",
  WORKSHOP: {
    ALL: "workshop/all",
    ONE: "workshop/",
    CURRICULUM: "workshop-curriculum/all?workshopFilter=",
    PURCHASE: "workshop/purchase",
  },
  USER: {
    ONE: "user/",
    SIGNUP: "user/signup",
    UPDATE: "user/update",
    PURCHASE_INTENT: "user/purchase-intent",
  },
  UPLOAD: "upload",
  COUPON: {
    VALIDATE: "coupon-code/validate",
  },
} as const;

export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  const API_URL = BASE_URL || "";
  const cleanApiUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${cleanApiUrl}${cleanPath}`;
};
