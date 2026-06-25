import { Fragment } from "react";
import {
  AboutUsSection,
  BrandLogo,
  // CategoriesSection,
  CounterSection,
  CourseSection,
  FaqSection,
  HeroBanner,
  LatestBlogsSection,
  TestimonialSection,
  VideoAreaSection,
  BranchSection,
} from "../../Components/Home";
import { Queries } from "../../Api";
import Loader from "../../Components/Common/Loader";

const Home = () => {
  const { data: bannerData, isLoading: isHeroBannerLoading } =
    Queries.useGetHeroBannerImage();
  const banner = bannerData?.data?.hero_banner_data[0];



  const { data: courseData, isLoading: isCourseLoading } =
    Queries.useGetAllCourses();
  const Courses = courseData?.data?.course_data || [];

  const { data: testimonialData, isLoading: isTestimonialLoading } =
    Queries.useGetTestimonials();

  const testimonials = testimonialData?.data?.testimonial_data;

  const { data: brandData, isLoading: isBrandLoading } = Queries.useGetTrutedPartner();
  const brandImages = brandData?.data?.trusted_partner_data;

  const { data: faqData, isLoading: isFaqLoading } = Queries.useGetFaq();

  const faq = faqData?.data?.faq_data;

  const { data: blogData, isLoading: isBlogLoading } = Queries.useGetAllBlogs();

  const Blogs = blogData?.data?.blog_data;

  const isAppLoading =
    isHeroBannerLoading ||

    isCourseLoading ||
    isTestimonialLoading ||
    isBrandLoading ||
    isFaqLoading ||
    isBlogLoading;

  return (
    <Fragment>
      <Loader loading={isAppLoading} />
      <HeroBanner banner={banner} />

      <AboutUsSection />
      <CourseSection courses={Courses} />
      <VideoAreaSection />
      <CounterSection />
      <TestimonialSection testimonials={testimonials} />
      <BrandLogo brandImages={brandImages} />
      <FaqSection faq={faq} />
      <BranchSection />
      <LatestBlogsSection blogs={Blogs} />
    </Fragment>
  );
};

export default Home;
