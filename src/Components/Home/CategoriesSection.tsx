import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { CourseCategory } from "../../Types";

const CategoriesSection = ({ category }: { category?: CourseCategory[] }) => {
  const featuredCategory = category
    ?.filter((item) => item?.isFeatured === true)
    .slice(0, 4);

  const colorClasses = [
    "elementor-repeater-item-71e2b22",
    "elementor-repeater-item-21733b5",
    "elementor-repeater-item-29d920a",
    "elementor-repeater-item-b3ea4bf",
  ];

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-a2bf539 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="a2bf539"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-extended">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-27340e6"
          data-id="27340e6"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-1f829d3 animated elementor-widget elementor-widget-edublink-heading"
              data-aos="fade-up"
              data-aos-duration={1500}
            >
              <div className="elementor-widget-container">
                <div className="edublink-section-heading">
                  <span className="pre-heading">CATEGORIES</span>
                  <h3 className="heading">
                    Online{" "}
                    <span className="edublink-color-primary">Classes</span> For
                    Remote Learning.
                  </h3>
                  <div className="title-shape">
                    <i className="icon-19" />
                  </div>
                  <div className="sub-heading">
                    Consectetur adipiscing elit sed do eiusmod tempor.
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="elementor-element elementor-element-a914052 animated elementor-widget elementor-widget-edublink-lp-course-category">
              <div className="elementor-widget-container">
                <div className="eb-course-cat-wrapper">
                  <div className="eb-course-cat-container-grid eb-course-cat-grid edublink-row">
                    {featuredCategory?.map((item, index) => (
                      <Link
                        to={ROUTES.COURSE.BASE}
                        state={item?._id}
                        key={item?._id}
                        className={`edublink-col-lg-3 edublink-col-md-6 edublink-col-sm-6 
    edublink-course-single-cat edublink-course-cat-single-grid 
    ${colorClasses[index % colorClasses.length]}`}
                        data-aos="fade-up"
                        data-aos-duration={1200}
                      >
                        <div className="edublink-category-2">
                          <div className="icon">
                            <i
                              aria-hidden="true"
                              className={`edublink icon-${9 + index}`}
                            />
                          </div>

                          <div className="content">
                            <h5 className="title">
                              {/* <Link to={`/courses?category=${item._id}`}> */}
                              {item.name}
                              {/* </Link> */}
                            </h5>

                            <p className="description">{item.description}</p>

                            {/* Optional */}
                            <span className="course-count">09 Courses</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
