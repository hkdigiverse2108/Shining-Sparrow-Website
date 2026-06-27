import { useState } from "react";
import { Queries } from "../../Api";
import { BreadCrumb, GetCeritficateSection } from "../../Components/Common";
import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import Loader from "../../Components/Common/Loader";

const Testimonial = () => {
  const { data, isLoading } = Queries.useGetTestimonials();
  const [visibleCount, setVisibleCount] = useState(5);

  const testimonials = data?.data?.testimonial_data;

  const renderStars = (rate: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <i key={index} className={`icon-23 ${index < rate ? "active" : ""}`} />
    ));

  return (
    <>
      <Loader loading={isLoading} />

      <div id="faq">
        <section>
          <BreadCrumb title="Testimonial" />
        </section>
        <MouseParallax>
          <section className="">
            <section className="my-10! container space-y-6! elementor-section elementor-section-boxed">
              {testimonials?.slice(0, visibleCount).map((item) => (
                <div className="eb-testimonial-item eb-testimonial">
                  <div className="eb-testimonial-grid py-10 md:py-20 pb-0!">
                    <div className="content flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
                      <div className="w-full md:flex-1 md:pe-16 text-center md:text-left!">
                        <div className="rating-icon space-x-2! mb-4 flex justify-center md:justify-start">
                          {renderStars(item.rate)}
                        </div>
                        <p className="description mb-6 md:text-left!">{item.description}</p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-1 sm:gap-4">
                          <h5 className="title m-0! md:text-left!">{item.name}</h5>
                          <span className="subtitle hidden sm:block">|</span>
                          <span className="subtitle m-0! md:text-left!">{item.designation}</span>
                        </div>
                      </div>
                      <div className="thumbnail flex-shrink-0! relative mb-6 md:mb-0">
                        <img
                          decoding="async"
                          src={
                            item.image ||
                            `${ImagePath}home/Profile.webp`
                          }
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `${ImagePath}home/Profile.webp`;
                          }}
                          style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover" }}
                          className="testimonial-author-avatar shadow-sm border-4 border-white"
                          alt={item.name}
                        />
                        <span className="qoute-icon absolute -bottom-2 -right-2 bg-[#F26522] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border-[3px] border-white">
                          <i className="icon-26" style={{ fontSize: "14px" }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {testimonials && testimonials.length > visibleCount && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                  <button
                    className="edu-btn btn-medium"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  >
                    Load More <i className="icon-4" />
                  </button>
                </div>
              )}
            </section>

            <GetCeritficateSection />
          </section>
        </MouseParallax>
      </div>
    </>
  );
};

export default Testimonial;
