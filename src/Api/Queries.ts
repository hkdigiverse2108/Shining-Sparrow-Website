import { KEYS } from "../Constants/Keys";
import { URL_KEYS } from "../Constants/Url";
import type {
  AllCourseApiResponse,
  AppQueryOptions,
  BlogApiResponse,
  BlogListApiResponse,
  CourseApiResponse,
  CourseCategoryResponse,
  CourseCurriculumApiResponse,
  CourseLessonApiResponse,
  FaqResponse,
  GalleryListApiResponse,
  HeroBannerResponse,
  InstructorListApiResponse,
  LegalityApiResponse,
  MyCourseResponse,
  QueryParams,
  SettingsApiResponse,
  TestimonialRatingSummaryResponse,
  TestimonialResponse,
  TrustedPartnerResponse,
  UserResponse,
  AllWorkshopApiResponse,
  WorkshopApiResponse,
  WorkshopCurriculumApiResponse,
} from "../Types";
import { Get } from "./Methods";
import { useQueries } from "./ReactQuery";

export const Queries = {
  // ******************* Hero Banner *******************
  useGetHeroBannerImage: (options?: AppQueryOptions<HeroBannerResponse>) =>
    useQueries<HeroBannerResponse>(
      [KEYS.HERO_BANNER],
      () => Get(URL_KEYS.HERO_BANNER.ALL),
      options,
    ),

  // ******************* Course Category *******************
  useGetCourseCategory: (options?: AppQueryOptions<CourseCategoryResponse>) =>
    useQueries<CourseCategoryResponse>(
      [KEYS.COURSE_CATEGORY],
      () => Get(URL_KEYS.COURSE_CATEGORY.ALL),
      options,
    ),

  // ******************* Testimonial *******************
  useGetTestimonials: (options?: AppQueryOptions<TestimonialResponse>) =>
    useQueries<TestimonialResponse>(
      [KEYS.TESTIMONIALS],
      () => Get(URL_KEYS.TESTIMONIALS.ALL),
      options,
    ),
  useGetTestimonialsByType: (
    type: string,
    options?: AppQueryOptions<TestimonialResponse>,
  ) =>
    useQueries<TestimonialResponse>(
      [KEYS.TESTIMONIALS, type],
      () => Get(`${URL_KEYS.TESTIMONIALS.ALL}?type=${type}`),
      options,
    ),
  useGetTestimonialRatingSummary: (
    learningCatalogFilter: string,
    options?: AppQueryOptions<TestimonialRatingSummaryResponse>,
  ) =>
    useQueries<TestimonialRatingSummaryResponse>(
      [KEYS.TESTIMONIAL_RATINGS_SUMMARY, learningCatalogFilter],
      () =>
        Get(
          `${URL_KEYS.TESTIMONIALS.RATINGS_SUMMARY}?learningCatalogFilter=${learningCatalogFilter}`,
        ),
      options,
    ),

  // ******************* FAQ *******************
  useGetFaq: (options?: AppQueryOptions<FaqResponse>) =>
    useQueries<FaqResponse>([KEYS.FAQ], () => Get(URL_KEYS.FAQ.ALL), options),
  useGetFaqByType: (
    params?: { page?: number; limit?: number; type?: string },
    options?: AppQueryOptions<FaqResponse>,
  ) =>
    useQueries<FaqResponse>(
      [KEYS.FAQ, params],
      () => Get(URL_KEYS.FAQ.ALL, params),
      options,
    ),

  // ******************* Trusted Partner *******************
  useGetTrutedPartner: (options?: AppQueryOptions<TrustedPartnerResponse>) =>
    useQueries<TrustedPartnerResponse>(
      [KEYS.TRUSTED_PARTNER],
      () => Get(URL_KEYS.TRUSTED_PARTNER.ALL),
      options,
    ),

  // ******************* Courses *******************
  useGetAllCourses: (
    params?: QueryParams,
    options?: AppQueryOptions<AllCourseApiResponse>,
  ) =>
    useQueries<AllCourseApiResponse>(
      [KEYS.COURSE, params],
      () => Get(URL_KEYS.COURSE.ALL, params),
      options,
    ),
  useGetMyCourses: (
    params?: QueryParams,
    options?: AppQueryOptions<MyCourseResponse>,
  ) =>
    useQueries<MyCourseResponse>(
      [KEYS.MY_COURSES, params],
      () => Get(URL_KEYS.COURSE.MY_COURSES, params),
      options,
    ),
  useGetSingleCourse: (id?: string) =>
    useQueries<CourseApiResponse>([KEYS.COURSE_ONE, id], () =>
      Get(`${URL_KEYS.COURSE.ONE}${id}`),
    ),

  // ******************* Courses Curriculum *******************
  useGetCourseCurriculum: (id?: string) =>
    useQueries<CourseCurriculumApiResponse>([KEYS.COURSE_CURRICULUM, id], () =>
      Get(`${URL_KEYS.COURSE.CURRICULUM}${id}`),
    ),
  useGetCourseLessons: (id?: string) =>
    useQueries<CourseLessonApiResponse>([KEYS.COURSE_LESSON, id], () =>
      Get(`${URL_KEYS.COURSE.LESSON}${id}`),
    ),
  useGetCurriculumByLesson: (
    lessonId?: string,
    options?: AppQueryOptions<CourseCurriculumApiResponse>,
  ) =>
    useQueries<CourseCurriculumApiResponse>(
      [KEYS.COURSE_CURRICULUM, lessonId],
      () => Get(`${URL_KEYS.COURSE.CURRICULUM_BY_LESSON}${lessonId}`),
      { enabled: !!lessonId, ...options },
    ),

  // ******************* Instructor *******************
  useGetAllInstructor: (
    params?: QueryParams,
    options?: AppQueryOptions<InstructorListApiResponse>,
  ) =>
    useQueries<InstructorListApiResponse>(
      [KEYS.INSTRUCTOR, params],
      () => Get(URL_KEYS.INSTRUCTOR.ALL),
      options,
    ),

  // ******************* Legality *******************
  useGetLegality: (
    typeFilter: string,
    options?: AppQueryOptions<LegalityApiResponse>,
  ) =>
    useQueries<LegalityApiResponse>(
      [KEYS.LEGALITY, typeFilter],
      () => Get(`${URL_KEYS.LEGALITY}?typeFilter=${typeFilter}`),
      options,
    ),

  // ******************* BLogs *******************
  useGetAllBlogs: (
    params?: QueryParams,
    options?: AppQueryOptions<BlogListApiResponse>,
  ) =>
    useQueries<BlogListApiResponse>(
      [KEYS.BLOG, params],
      () => Get(URL_KEYS.BLOG.ALL, params),
      options,
    ),
  useGetSingleBlog: (id?: string) =>
    useQueries<BlogApiResponse>([KEYS.BLOG_ONE, id], () =>
      Get(`${URL_KEYS.BLOG.ONE}${id}`),
    ),

  // ******************* Settings *******************
  useGetAllSettings: (options?: AppQueryOptions<SettingsApiResponse>) =>
    useQueries<SettingsApiResponse>(
      [KEYS.SETTINGS],
      () => Get(URL_KEYS.SETTINGS),
      options,
    ),

  // ******************* Gallary *******************
  useGetAllGallary: (options?: AppQueryOptions<GalleryListApiResponse>) =>
    useQueries<GalleryListApiResponse>(
      [KEYS.GALLARY],
      () => Get(URL_KEYS.GALLARY),
      options,
    ),
  // ******************* Workshop *******************
  useGetAllWorkshops: (
    params?: QueryParams,
    options?: AppQueryOptions<AllWorkshopApiResponse>,
  ) =>
    useQueries<AllWorkshopApiResponse>(
      [KEYS.WORKSHOP, params],
      () => Get(URL_KEYS.WORKSHOP.ALL, params),
      options,
    ),
  useGetSingleWorkshop: (id?: string) =>
    useQueries<WorkshopApiResponse>([KEYS.WORKSHOP_ONE, id], () =>
      Get(`${URL_KEYS.WORKSHOP.ONE}${id}`),
    ),
  useGetWorkshopCurriculum: (
    workshopId?: string,
    options?: AppQueryOptions<WorkshopCurriculumApiResponse>,
  ) =>
    useQueries<WorkshopCurriculumApiResponse>(
      [KEYS.WORKSHOP_CURRICULUM, workshopId],
      () => Get(`${URL_KEYS.WORKSHOP.CURRICULUM}${workshopId}`),
      { enabled: !!workshopId, ...options },
    ),

  // ******************* User *******************
  useGetUser: (id: string, options?: AppQueryOptions<UserResponse>) =>
    useQueries<UserResponse>(
      [KEYS.USER, id],
      () => Get(`${URL_KEYS.USER.ONE}${id}`),
      options,
    ),
};
