export const ROUTES = {
  HOME: "",
  CONTACT: "/contact",
  ABOUT: "/about",
  GALLERY: "/gallery",
  FAQ: "/faq",
  TESTIMONIAL: "/testimonial",
  RETURN_POLICY: "/return-cancellation-policy",
  TERMS_CONDITION: "/terms-condition-policy",
  PRIVACY_POLICY: "/privacy-policy",

  AUTH: {
    BASE: "/my-account",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFY_OTP: "/verify-otp",
    Reset_PASSWORD: "/reset-password",
    CHANGE_PASSWORD: "/change-password",
  },
  WORKSHOP: {
    BASE: "/workshop",
    DETAILS: "/workshop/details/:id",
    REGISTER: "/workshop/register",
    PAYMENT: "/workshop/payment",
  },
  COURSE: {
    BASE: "/course",
    DETAILS: "/course/details/:id",
    REGISTER: "/course/register",
    PAYMENT: "/course/payment",
  },
  BLOG: {
    BASE: "/blog",
    DETAILS: "/blog/details/:id",
  },
  USER: {
    PROFILE: "/profile",
  },
} as const;
