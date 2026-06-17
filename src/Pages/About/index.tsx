import { Queries } from "../../Api";
import { InstructorCard } from "../../Components/About";
import { BreadCrumb } from "../../Components/Common";
import GetCeritficateSection from "../../Components/Common/GetCeritficateSection";
import { TestimonialSection, VideoAreaSection } from "../../Components/Home";
import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";

const features = [
  {
    icon: "edublink icon-45",
    title: "High Quality Courses",
    description:
      "Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.",
    color: "#1AB69D",
  },
  {
    icon: "edublink icon-46",
    title: "Life Time Access",
    description:
      "Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.",
    color: "#EE4A62",
  },
  {
    icon: "edublink icon-45",
    title: "Expert Instructors",
    description:
      "Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.",
    color: "#4664E4",
  },
];

const stats = [
  {
    value: "45.2",
    suffix: "K",
    label: "STUDENT ENROLLED",
    color: "#1AB69D",
  },
  {
    value: "32.4",
    suffix: "K",
    label: "CLASS COMPLETED",
    color: "#F8577C",
  },
  {
    value: "354",
    suffix: "+",
    label: "TOP INSTRUCTORS",
    color: "#FFA41B",
  },
  {
    value: "99.9",
    suffix: "%",
    label: "SATISFACTION RATE",
    color: "#7C4BFF",
  },
];

const About = () => {
  const { data: brandApi } = Queries.useGetTrutedPartner();
  const brandImages = brandApi?.data?.trusted_partner_data;

  const { data: InstructorsApi } = Queries.useGetAllInstructor();
  const AllInstroctor = InstructorsApi?.data?.instructor_data;

  return (
    <>
      <MouseParallax>
        <div>
          <BreadCrumb title="About" />
        </div>
        <div className="entry-content">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="10337"
            className="elementor elementor-10337"
          >
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-6f2542f elementor-section-full_width elementor-section-height-default elementor-section-height-default"
              data-id="6f2542f"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-983caae"
                  data-id="983caae"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {/* Main Content */}
                    <section
                      className="mt-12! elementor-section elementor-inner-section elementor-element elementor-element-585a9d2 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                      data-id="585a9d2"
                      data-element_type="section"
                    >
                      <div className="elementor-container elementor-column-gap-extended">
                        {/* Left Column */}
                        <div
                          className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-7fd0f96 "
                          data-id="7fd0f96"
                          data-element_type="column"
                        >
                          <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                              className="elementor-element elementor-element-4d12806 edublink-br-tp-none elementor-widget elementor-widget-edublink-heading"
                              data-id="4d12806"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">
                                <div className="edublink-section-heading">
                                  <h3 className="heading">
                                    We Providing The <br />
                                    Best <mark>Quality Online</mark> Courses
                                  </h3>
                                  <div className="title-shape">
                                    <i className="icon-19" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Column */}
                        <div
                          className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-893876e"
                          data-id="893876e"
                          data-element_type="column"
                        >
                          <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                              className="elementor-element elementor-element-296f8ea elementor-widget elementor-widget-text-editor"
                              data-id="296f8ea"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">
                                <style>{`
                              .elementor-widget-text-editor .elementor-drop-cap {
                                float: left;
                                text-align: center;
                                line-height: 1;
                                font-size: 50px;
                              }
                            `}</style>
                                Lorem ipsum dolor sit amet cons etur adipisicing
                                elit sed do eiusm aut tempor incididunt labore
                                dolore magna aliqua quis nostrud ex ertation
                                lamcolab oris aliquip.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-605da34 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="605da34"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-extended">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-ea809cd"
                    data-id="ea809cd"
                    data-element_type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className="elementor-element elementor-element-7e193de elementor-widget elementor-widget-edublink-features animated edublink--slide-up"
                        data-id="7e193de"
                        data-element_type="widget"
                        data-settings='{"_animation":"edublink--slide-up","_animation_delay":50}'
                      >
                        <div className="elementor-widget-container">
                          <div className="edublink-feature-5-widget">
                            <div className="edublink-feature-item">
                              <div
                                className="icon"
                                style={{ backgroundColor: item?.color }}
                              >
                                <i aria-hidden="true" className={item?.icon} />
                              </div>
                              <div className="content">
                                <h4 className="title">{item?.title}</h4>
                                <p className="description">
                                  {item?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-[290px]!  elementor-section elementor-top-section elementor-element elementor-element-178ad6d  ">
              <div className="elementor-background-overlay" />
              <VideoAreaSection />
              <div className="mt-12! grid grid-cols-2  sm:grid-cols-4  xl:grid-cols-8 gap-2  w-full! justify-center items-center divide-x divide-gray-200 ">
                {brandImages?.map((item) => (
                  <div
                    key={item?._id}
                    className={`elementor-column elementor-col-16 elementor-top-column elementor-element   w-full! flex! justify-center!`}
                    data-element_type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className={`elementor-element elementor-element-${item._id} elementor-widget elementor-widget-image`}
                        data-id={item?._id}
                        data-element_type="widget"
                        data-widget_type="image.default"
                      >
                        <div className="elementor-widget-container">
                          <img
                            loading="lazy"
                            decoding="async"
                            width={120}
                            height={120}
                            src={item?.image}
                            className={`attachment-full size-full max-w-40! `}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className=" mt-30!">
              <TestimonialSection />
            </section>

            <section className="px-6! elementor-element-178ad6d elementor-section elementor-top-section elementor-element overflow-hidden!  ">
              <div className="elementor-container elementor-column-gap-extended ">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div
                    className="elementor-element elementor-element-7d45c13 elementor-widget elementor-widget-edublink-heading animated edublink--slide-up"
                    data-id="7d45c13"
                    data-element_type="widget"
                    data-settings='{"_animation":"edublink--slide-up","_animation_delay":150}'
                  >
                    <div className="elementor-widget-container">
                      <div className="edublink-section-heading">
                        <span className="pre-heading">FUN FACTS</span>
                        <h3 className="heading">
                          The Learge <mark>Number</mark> of Counting
                        </h3>
                        <div className="title-shape">
                          <i className="icon-19"></i>
                        </div>
                        <div className="sub-heading">
                          Lorem ipsum dolor sit amet consectur adipiscing elit
                          sed eiusmod tempor incididunt labore dolore magna
                          aliquaenim ad minim.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                <div className=" relative w-full ">
                  <section className=" max-lg:hidden! absolute flex! left-0 right-0 w-full! h-full!  ">
                    <div className="absolute -top-45! -left-30 ">
                      <div className="absolute z-50 top-20 left-0!">
                        <div className=" ">
                          <img
                            decoding="async"
                            src={`${ImagePath}shapes/shape-5.png`}
                            alt="shape-02 "
                            className="rotate-slow"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div data-depth={2} className="">
                          <img
                            decoding="async"
                            src={`${ImagePath}shapes/shape-1.png`}
                            alt="shape-45"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-30 -right-30">
                      <div className="absolute ">
                        <div data-depth={-3} className="">
                          <img
                            decoding="async"
                            src={`${ImagePath}shapes/shape-18.png`}
                            alt="shape-04"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div data-depth={4} className="">
                          <img
                            decoding="async"
                            src={`${ImagePath}shapes/shape-7.png`}
                            alt="shape-05"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="relative max-lg:mt-22! w-full bg-white rounded-2xl p-15! sm:p-30! shadow-xl">
                    <div className="z-50! grid sm:grid-cols-2 grid-cols-1">
                      {stats.map((item, index) => (
                        <div
                          key={item.label}
                          className={`flex flex-col items-center justify-center py-4! sm:p-6! text-center border-[#ececec] ${
                            index === 0 ? "border-r border-b" : ""
                          } ${index === 1 ? " border-b" : ""}  ${
                            index === 2 ? "border-r " : ""
                          } max-sm:border-none `}
                        >
                          <div className="edublink-counter-item ">
                            <span
                              className="odometer odometer-auto-theme  font-extrabold"
                              style={{ color: item.color }}
                            >
                              {item.value}
                            </span>
                            <span
                              className="edublink-counter-suffix font-extrabold"
                              style={{ color: item.color }}
                            >
                              {item.suffix}
                            </span>
                          </div>

                          <h6 className="mt-3 uppercase  text-[13px]! font-normal!">
                            {item.label}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className=" my-30!">
              <section className="">
                <div className="absolute -mt-42! grid grid-cols-2  w-full justify-between! -z-10">
                  <img
                    src={`${ImagePath}shapes/map-shape-3.png`}
                    className="rotate-180"
                    alt=""
                  />
                  <img
                    src={`${ImagePath}shapes/map-shape-3.png`}
                    className="rotate-180"
                    alt=""
                  />
                </div>
              </section>
              <section
                className=" elementor-section elementor-inner-section elementor-element elementor-element-b0a24a6 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                data-id="b0a24a6"
                data-element_type="section"
              >
                <div className="elementor-container elementor-column-gap-extended">
                  <div
                    className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-99ceb68"
                    data-id="99ceb68"
                    data-element_type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-f0750db elementor-widget elementor-widget-edublink-heading animated edublink--slide-up">
                        <div className="elementor-widget-container">
                          <div className="edublink-section-heading text-center">
                            <span className="pre-heading">INSTRUCTORS</span>
                            <h3 className="heading">Course Instructors</h3>
                            <div className="title-shape">
                              <i className="icon-19"></i>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section
                className="elementor-section elementor-inner-section elementor-element elementor-element-ff4fb92 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                data-id="ff4fb92"
                data-element_type="section"
              >
                <div className="elementor-container elementor-column-gap-extended">
                  <div
                    className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-37a9587"
                    data-id="37a9587"
                    data-element_type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-96a69af elementor-widget elementor-widget-edublink-team animated edublink--slide-up">
                        <div className="elementor-widget-container">
                          <div className="eb-team-wrapper">
                            <div className="eb-team-container eb-team-grid edublink-row">
                              {AllInstroctor?.map((instructor) => (
                                <InstructorCard
                                  key={instructor._id}
                                  instructor={instructor}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <GetCeritficateSection />
          </div>
        </div>
      </MouseParallax>
    </>
  );
};

export default About;
