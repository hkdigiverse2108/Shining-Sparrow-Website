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
const Home = () => {
  const { data: bannerData } =
    Queries.useGetHeroBannerImage();
  const banner = bannerData?.data?.hero_banner_data[0];



  const { data: courseData } =
    Queries.useGetAllCourses();
  const Courses = courseData?.data?.course_data || [];

  const { data: testimonialData } =
    Queries.useGetTestimonials();

  const testimonials = testimonialData?.data?.testimonial_data;

  const { data: brandData } = Queries.useGetTrutedPartner();
  const brandImages = brandData?.data?.trusted_partner_data;

  const { data: faqData } = Queries.useGetFaq();

  const faq = faqData?.data?.faq_data;

  const { data: blogData } = Queries.useGetAllBlogs();

  const Blogs = blogData?.data?.blog_data;

  return (
    <Fragment>
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
