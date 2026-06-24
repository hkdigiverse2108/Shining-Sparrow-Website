import { ROUTES } from "../Constants";
import About from "../Pages/About";
import Blog from "../Pages/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Contact from "../Pages/Contact";
import Franchise from "../Pages/Franchise";
import Course from "../Pages/Course";
import CourseDetails from "../Pages/Course/CourseDetails";
import Workshop from "../Pages/Workshop";
import WorkshopDetails from "../Pages/Workshop/WorkshopDetails";
import Faq from "../Pages/Faq";
import Gallery from "../Pages/Gallery";
import Home from "../Pages/Home";
import UserProfile from "../Pages/User";
import PageNotFound from "../Pages/PageNotFound";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import ReturnPolicy from "../Pages/ReturnPolicy";
import TermsCondition from "../Pages/TermsCondition";
import Testimonial from "../Pages/Testimonial/Testimonial";
import PrivateRoutes from "./PrivateRoutes";

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
