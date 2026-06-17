import { Queries } from "../../Api";
import { BreadCrumb, GetCeritficateSection } from "../../Components/Common";
import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import Loader from "../../Components/Common/Loader";

const Testimonial = () => {
  const { data, isLoading } = Queries.useGetTestimonials();

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
              {testimonials?.map((item) => (
                <div className="eb-testimonial-item eb-testimonial">
                  <div className="eb-testimonial-grid  py-20! pb-0! ">
                    <div className="content flex justify-between">
                      <div>
                        <div className="rating-icon space-x-2!">
                          {renderStars(item.rate)}
                        </div>
                        <p className="description">{item.description}</p>
                        <div className="flex  gap-4 space-x-4">
                          <h5 className="title ">{item.name}</h5>
                          <span className="subtitle">{item.designation}</span>
                        </div>
                      </div>
                      <div className="thumbnail">
                        <img
                          decoding="async"
                          src={
                            // item.image ||

                            `${ImagePath}testimonial/testimonial-01.png`
                          }
                          className="testimonial-author-avatar sm:w-40! sm:h-full! "
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
            </section>

            <GetCeritficateSection />
          </section>
        </MouseParallax>
      </div>
    </>
  );
};

export default Testimonial;
