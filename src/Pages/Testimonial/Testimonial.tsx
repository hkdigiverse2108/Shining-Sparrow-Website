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
                  <div className="eb-testimonial-grid py-20! pb-0!">
                    <div className="content flex justify-between gap-6!">
                      <div className="pe-6! sm:pe-16! md:pe-24!">
                        <div className="rating-icon space-x-2!">
                          {renderStars(item.rate)}
                        </div>
                        <p className="description">{item.description}</p>
                        <div className="flex  gap-4 space-x-4">
                          <h5 className="title ">{item.name}</h5>
                          <span className="subtitle">{item.designation}</span>
                        </div>
                      </div>
                      <div className="thumbnail flex-shrink-0!">
                        <img
                          decoding="async"
                          src={
                            item.image ||
                            `${ImagePath}testimonial/testimonial-01.png`
                          }
                          style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover" }}
                          className="testimonial-author-avatar"
                          alt={item.name}
                        />
                        <span className="qoute-icon">
                          <i className="icon-26" />
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
