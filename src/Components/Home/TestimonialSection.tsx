import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialSettings } from "../../Data";
import { ImagePath, ROUTES } from "../../Constants";
import { Link } from "react-router-dom";
import type { Testimonial } from "../../Types";

const TestimonialSection = ({ testimonials }: { testimonials?: Testimonial[] }) => {
  const featuredTestimonials = testimonials?.filter(
    (item) => item.isFeatured === true,
  );

  const renderStars = (rate: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <i key={index} className={`icon-23 ${index < rate ? "active" : ""}`} />
    ));

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-e9f9bf8 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="e9f9bf8"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-extended">
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-935311f"
          data-id="935311f"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-1ca404c elementor-widget elementor-widget-edublink-heading"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="elementor-widget-container">
                <div className="edublink-section-heading">
                  <span className="pre-heading">TESTIMONIALS</span>
                  <h3 className="heading">What Our Students Have To Say</h3>
                  <div className="title-shape">
                    <i className="icon-19" />
                  </div>
                  <div className="sub-heading">
                    Lorem ipsum dolor sit amet consectur adipiscing elit sed
                    eiusmod tempor incididunt labore dolore magna aliquaenim ad
                    minim.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="elementor-element elementor-element-93d6383 elementor-widget elementor-widget-edublink-button"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="elementor-widget-container">
                <div className="edublink-button-widget-wrapper">
                  <Link
                    to={ROUTES.TESTIMONIAL}
                    className="edublink-button-item edublink-button-style-default edublink-button-size-large edublink-button-icon-position-after default-style"
                  >
                    View All
                    <i className="icon-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1461db3"
          data-id="1461db3"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-1cc9653 elementor-widget elementor-widget-edublink-testimonial"
              data-widget_type="edublink-testimonial.default"
            >
              <div className="elementor-widget-container">
                <div className="eb-testimonial-wrapper eb-testimonial-wrapper-style-2">
                  <Swiper
                    {...TestimonialSettings}
                    className="eb-testimonial eb-testimonial-style-2"
                  >
                    {featuredTestimonials?.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="eb-testimonial-item">
                          <div className="eb-testimonial-grid">
                            <div className="thumbnail">
                              <img
                                decoding="async"
                                src={
                                  item.image ||
                                  `${ImagePath}testimonial/testimonial-01.png`
                                }
                                className="testimonial-author-avatar"
                                alt={item.name}
                              />
                              <span className="qoute-icon">
                                <i className="icon-26" />
                              </span>
                            </div>

                            <div className="content">
                              <p className="description">{item.description}</p>

                              <div className="rating-icon">
                                {renderStars(item.rate)}
                              </div>

                              <h5 className="title">{item.name}</h5>
                              <span className="subtitle">
                                {item.designation}
                              </span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}

                    <div className="swiper-pagination" />
                  </Swiper>

                  {!featuredTestimonials?.length && (
                    <p style={{ textAlign: "center" }}>
                      No testimonials available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
