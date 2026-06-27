import { lazy } from "react";
import { ROUTES } from "../Constants";

const About = lazy(() => import("../Pages/About"));
const Blog = lazy(() => import("../Pages/Blog"));
const BlogDetails = lazy(() => import("../Pages/Blog/BlogDetails"));
const Contact = lazy(() => import("../Pages/Contact"));
const Franchise = lazy(() => import("../Pages/Franchise"));
const Course = lazy(() => import("../Pages/Course"));
const CourseDetails = lazy(() => import("../Pages/Course/CourseDetails"));
const Workshop = lazy(() => import("../Pages/Workshop"));
const WorkshopDetails = lazy(() => import("../Pages/Workshop/WorkshopDetails"));
const Faq = lazy(() => import("../Pages/Faq"));
const Gallery = lazy(() => import("../Pages/Gallery"));
const Home = lazy(() => import("../Pages/Home"));
const UserProfile = lazy(() => import("../Pages/User"));
const PageNotFound = lazy(() => import("../Pages/PageNotFound"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const ReturnPolicy = lazy(() => import("../Pages/ReturnPolicy"));
const TermsCondition = lazy(() => import("../Pages/TermsCondition"));
const Testimonial = lazy(() => import("../Pages/Testimonial/Testimonial"));
const PrivateRoutes = lazy(() => import("./PrivateRoutes"));

export const PageRoutes = [
  { path: "/", element: <Home /> },
  { path: ROUTES.COURSE.BASE, element: <Course /> },
  { path: ROUTES.COURSE.DETAILS, element: <CourseDetails /> },
  { path: ROUTES.WORKSHOP.BASE, element: <Workshop /> },
  { path: ROUTES.WORKSHOP.DETAILS, element: <WorkshopDetails /> },

  // ======= Protected Routes =======
  {
    element: <PrivateRoutes />,
    children: [{ path: ROUTES.USER.PROFILE, element: <UserProfile /> }],
  },

  // ======= Quick Links =======
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.GALLERY, element: <Gallery /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.FRANCHISE, element: <Franchise /> },
  { path: ROUTES.BLOG.BASE, element: <Blog /> },
  { path: ROUTES.BLOG.DETAILS, element: <BlogDetails /> },

  // ======= Support & Policy =======
  { path: ROUTES.FAQ, element: <Faq /> },
  { path: ROUTES.TESTIMONIAL, element: <Testimonial /> },
  { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: ROUTES.TERMS_CONDITION, element: <TermsCondition /> },
  { path: ROUTES.RETURN_POLICY, element: <ReturnPolicy /> },
  { path: "*", element: <PageNotFound /> },
];

// export const AuthRoutes = [];
