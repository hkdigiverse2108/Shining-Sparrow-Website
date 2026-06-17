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
  },
  UPLOAD: "upload",
} as const;
