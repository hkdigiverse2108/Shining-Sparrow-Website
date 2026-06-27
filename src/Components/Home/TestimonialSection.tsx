import { Swiper, SwiperSlide } from "swiper/react";
import { ImagePath, ROUTES } from "../../Constants";
import { Link } from "react-router-dom";
import type { Testimonial } from "../../Types";

import { EffectCreative, Autoplay, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css/effect-creative";

const TestimonialSection = ({ testimonials }: { testimonials?: Testimonial[] }) => {
  // Show the latest 4 testimonials sorted by upload date
  const latestTestimonials = testimonials
    ?.slice()
    ?.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : parseInt(a._id.substring(0, 8), 16) * 1000;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : parseInt(b._id.substring(0, 8), 16) * 1000;
      return timeB - timeA;
    })
    ?.slice(0, 4) ?? [];

  const renderStars = (rate: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <i key={index} className={`icon-23 ${index < rate ? "active text-[#FFB800]" : "text-gray-300"}`} style={{ fontSize: "16px", marginRight: "4px" }} />
    ));

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-e9f9bf8 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="e9f9bf8"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-extended flex flex-col lg:flex-row items-center w-full">
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-935311f w-full lg:w-1/2! mb-10 lg:mb-0 text-center lg:text-left"
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
                  <div className="title-shape flex justify-center lg:justify-start">
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
                <div className="edublink-button-widget-wrapper flex justify-center lg:justify-start">
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
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1461db3 w-full lg:w-1/2!"
          data-id="1461db3"
          data-element_type="column"
          data-aos="fade-up"
          data-aos-duration={1200}
        >
          <div className="elementor-widget-wrap elementor-element-populated py-10 overflow-hidden md:overflow-visible flex justify-center w-full">
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] relative">
              <Swiper
                effect="creative"
                grabCursor={true}
                modules={[EffectCreative, Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true, el: ".swiper-pagination" }}
                loop={true}
                creativeEffect={{
                  limitProgress: 1,
                  prev: {
                    translate: ["-35%", 0, -200],
                    scale: 0.85,
                    opacity: 0.75,
                  },
                  next: {
                    translate: ["35%", 0, -200],
                    scale: 0.85,
                    opacity: 0.75,
                  },
                }}
                className="testimonial-cards-swiper pb-12! !overflow-visible"
              >
                {latestTestimonials?.map((item) => (
                  <SwiperSlide key={item._id} className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative h-auto min-h-[340px]">
                    {/* Dots Pattern Background */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-40 rounded-bl-full" 
                      style={{
                        backgroundImage: "radial-gradient(#65c3b8 2.5px, transparent 2.5px)",
                        backgroundSize: "18px 18px",
                        backgroundPosition: "0 0"
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center text-center h-full gap-4">
                      {/* Avatar with Badge */}
                      <div className="relative flex-shrink-0">
                        <img
                          decoding="async"
                          src={item.image || `${ImagePath}home/Profile.webp`}
                          onError={(e) => { 
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = `${ImagePath}home/Profile.webp`; 
                          }}
                          style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover" }}
                          className="shadow-sm border-4 border-white"
                          alt={item.name}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#F26522] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-[3px] border-white">
                          <i className="icon-26" style={{ fontSize: "14px" }} />
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-[#6b7280] text-[15px] sm:text-[16px] font-normal leading-[1.6] line-clamp-3 m-0">
                        {item.description}
                      </p>

                      <div className="w-full flex flex-col items-center mt-auto gap-2">
                        {/* Rating */}
                        <div className="flex">
                          {renderStars(item.rate)}
                        </div>

                        {/* Author */}
                        <div className="flex flex-col items-center">
                          <h4 className="text-[#4b3e39] font-bold text-lg sm:text-xl m-0 mb-1">{item.name}</h4>
                          <span className="text-[#9ca3af] text-[13px] sm:text-[14px] font-medium m-0">{item.designation}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="swiper-pagination !bottom-0" />
              </Swiper>

              {!latestTestimonials?.length && (
                <p style={{ textAlign: "center" }}>
                  No testimonials available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
