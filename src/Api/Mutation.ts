import { KEYS } from "../Constants/Keys";
import { URL_KEYS } from "../Constants/Url";
import type {
  AddNewsletterPayload,
  ForgotPasswordPayload,
  LoginPayload,
  PurchaseCoursePayload,
  RegisterPayload,
  ResetPasswordPayload,
  ResendOtpPayload,
  VerifyOtpPayload,
  VerifyCoursePayload,
  PurchaseWorkshopPayload,
} from "../Types";

import { Post } from "./Methods";
import { useMutations } from "./ReactQuery";

export const Mutation = {
  // ============= auth =============
  useLogin: () =>
    useMutations<LoginPayload, any>([KEYS.LOGIN], (input) =>
      Post(URL_KEYS.AUTH.LOGIN, input),
    ),
  useRegister: () =>
    useMutations<RegisterPayload, any>([KEYS.REGISTER], (input) =>
      Post(URL_KEYS.AUTH.REGISTER, input),
    ),
  useUserSignup: () =>
    useMutations<RegisterPayload, any>([KEYS.USER], (input) =>
      Post(URL_KEYS.USER.SIGNUP, input),
    ),
  useForgotPassword: () =>
    useMutations<ForgotPasswordPayload, any>([KEYS.FORGOT_PASSWORD], (input) =>
      Post(URL_KEYS.AUTH.FORGOT_PASSWORD, input),
    ),
  useVerifyOtp: () =>
    useMutations<VerifyOtpPayload, any>([KEYS.VERIFY_OTP], (input) =>
      Post(URL_KEYS.AUTH.VERIFY_OTP, input),
    ),
  useResendOtp: () =>
    useMutations<ResendOtpPayload, any>([KEYS.RESEND_OTP], (input) =>
      Post(URL_KEYS.AUTH.RESEND_OTP, input),
    ),
  useResetPassword: () =>
    useMutations<ResetPasswordPayload, any>([KEYS.RESET_PASSWORD], (input) =>
      Post(URL_KEYS.AUTH.RESET_PASSWORD, input),
    ),
  // ============= newsletter =============
  useAddNewsLetter: () =>
    useMutations<AddNewsletterPayload, any>([KEYS.NEWSLETTER], (input) =>
      Post(URL_KEYS.NEWSLETTER.ADD, input),
    ),
  // ============= contact =============
  useAddContact: () =>
    useMutations<AddNewsletterPayload, any>([KEYS.CONTACT], (input) =>
      Post(URL_KEYS.CONTACT.ADD, input),
    ),
  // ============= course =============
  usePurchaseCourse: () =>
    useMutations<PurchaseCoursePayload, any>([KEYS.PURCHASE_COURSE], (input) =>
      Post(URL_KEYS.COURSE.PURCHASE, input),
    ),
  useVerifyCourse: () =>
    useMutations<VerifyCoursePayload, any>([KEYS.VERIFY_COURSE], (input) =>
      Post(URL_KEYS.COURSE.VERIFY, input),
    ),
  // ============= workshop =============
  usePurchaseWorkshop: () =>
    useMutations<PurchaseWorkshopPayload, any>(
      [KEYS.PURCHASE_WORKSHOP],
      (input) => Post(URL_KEYS.WORKSHOP.PURCHASE, input),
    ),
  // ============= user =============
  useUpdateUser: () =>
    useMutations<any, any>([KEYS.UPDATE_USER], (input) =>
      Post(URL_KEYS.USER.UPDATE, input),
    ),
  useUpload: () =>
    useMutations<FormData, any>([KEYS.UPLOAD], (input) =>
      Post(URL_KEYS.UPLOAD, input),
    ),
};
