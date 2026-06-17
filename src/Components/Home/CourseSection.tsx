import { Link } from "react-router-dom";
import { CourseCard } from "../Course";
import { ROUTES } from "../../Constants";
import type { Course } from "../../Types";

const CourseSection = ({ courses }: { courses?: Course[] }) => {
  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-e0cd102 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
      <div className="elementor-background-overlay" />
      <div className="elementor-container elementor-column-gap-extended">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-cd4cbd1"
          data-id="cd4cbd1"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-b2d71ca elementor-widget elementor-widget-edublink-heading"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              <div className="elementor-widget-container">
                <div className="edublink-section-heading">
                  <span className="pre-heading">POPULAR COURSES</span>
                  <h3 className="heading">Pick A Course To Get Started</h3>
                  <div className="title-shape">
                    <i className="icon-19" />
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-6bce914 distant-learning-course elementor-widget elementor-widget-edublink-lp-courses">
              <div className="elementor-widget-container">
                <div className="edublink-course-widget-wrapper flex justify-center">
                  <div className="edublink-archive-lp-courses grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! w-full edublink-course-archive edublink-lms-courses-grid active-white-bg edublink-row eb-masonry-grid-wrapper">
                    {courses?.slice(0, 3)?.map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-555c286 elementor-widget elementor-widget-edublink-button"
              data-id="555c286"
              data-element_type="widget"
              data-widget_type="edublink-button.default"
            >
              <div className="elementor-widget-container">
                <div className="edublink-button-widget-wrapper">
                  <Link
                    className="edublink-button-item edublink-button-style-default edublink-button-size-custom edublink-button-icon-position-after default-style"
                    to={ROUTES.COURSE.BASE}
                  >
                    Browse more courses
                    <i className="icon-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
