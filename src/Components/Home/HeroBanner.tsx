import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import { useAppSelector } from "../../Store/Hook";
import type { HeroBannerData } from "../../Types";

const HeroBanner = ({ banner }: { banner?: HeroBannerData }) => {
  const settings = useAppSelector((state) => state.settings.settings);
  const AllSettings = settings;

  return (
    <section className="hero-banner hero-style-2 elementor-section elementor-top-section elementor-element elementor-element-843e85a elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle">
      <div className="elementor-background-overlay" />
      <div className="elementor-container elementor-column-gap-extended">
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-4e1c3b2"
          data-id="4e1c3b2"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-8bf8804 edublink-br-tl-none animated elementor-widget elementor-widget-heading"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="elementor-widget-container">
                <h1 className="elementor-heading-title elementor-size-default">
                  The Best <br />
                  Program to{" "}
                  <span className="edublink-color-secondary">Enroll</span> for
                  Exchange
                </h1>{" "}
              </div>
            </div>
            <div
              className="elementor-element elementor-element-b2b88e7 animated elementor-widget elementor-widget-text-editor"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="elementor-widget-container"></div>
            </div>
            <div
              className="elementor-element elementor-element-b2b88e7 elementor-widget elementor-widget-text-editor animated edublink--slide-up"
              data-id="b2b88e7"
              data-element_type="widget"
              data-settings='{"_animation":"edublink--slide-up","_animation_delay":200}'
              data-widget_type="text-editor.default"
            >
              <div className="elementor-widget-container">
                Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                officia deserunt mollit.{" "}
              </div>
            </div>
            <div
              className="elementor-element elementor-element-a16b2b3 animated elementor-widget elementor-widget-edublink-button"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="elementor-widget-container">
                <div className="edublink-button-widget-wrapper">
                  <Link
                    to={ROUTES.COURSE.BASE}
                    className="edublink-button-item edublink-button-style-default edublink-button-size-custom edublink-button-icon-position-after default-style"
                  >
                    Find courses
                    <i className="icon-4" />
                  </Link>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <MouseParallax className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-4c05e46">
          <div className="elementor-widget-wrap elementor-element-populated">
            <section
              className="elementor-section elementor-inner-section elementor-element elementor-element-1fca101 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="1fca101"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-3949981"
                  data-id={3949981}
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-689a668 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile animated elementor-widget elementor-widget-edublink-animation">
                      <div className="elementor-widget-container">
                        <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <span data-depth={2}>
                            <img
                              decoding="async"
                              src={`${ImagePath}shapes/shape-13.png`}
                              alt="Hero Shape 5"
                            />
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-5df5061 elementor-widget__width-auto elementor-absolute elementor-hidden-mobile animated elementor-widget elementor-widget-html"
                      data-aos="fade-right"
                      data-aos-duration={1200}
                    >
                      <div className="elementor-widget-container">
                        <div className="edublink-distant-learning-hero-online-support edublink-bg-white">
                          <div className="distant-learning-wrapper">
                            <div className="icon edublink-color-secondary">
                              <i className="icon-29" />
                            </div>
                            <div className="content">
                              <span className="subtitle edublink-p-bold">
                                Online Support
                              </span>
                              <h4 className="title edublink-p-medium edublink-color-secondary">
                                <Link to={`tel:${AllSettings?.phoneNumber}`}>
                                  {AllSettings?.phoneNumber}
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-5744aa9 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile animated elementor-widget elementor-widget-edublink-animation">
                      <div className="elementor-widget-container">
                        <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <span data-depth={-2}>
                            <img
                              decoding="async"
                              src={`${ImagePath}shapes/shape-15.png`}
                              alt="Shape-15"
                            />
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-1d3c287 animated elementor-widget elementor-widget-image"
                      data-aos="fade-down"
                      data-aos-duration={1500}
                    >
                      <div className="elementor-widget-container">
                        <img
                          decoding="async"
                          width={270}
                          height={300}
                          src={banner?.images[0]}
                          // src={`${ImagePath}banner/girl-2.webp`}
                          className="attachment-full size-full wp-image-1269"
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-2b8e525">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-bf91029 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile animated elementor-widget elementor-widget-edublink-animation">
                      <div className="elementor-widget-container">
                        <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <span data-depth={-2}>
                            <img
                              decoding="async"
                              src={`${ImagePath}shapes/shape-16.png`}
                              alt="Hero Shape 6"
                            />
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-9353897 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile animated elementor-widget elementor-widget-edublink-animation">
                      <div className="elementor-widget-container">
                        <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <span data-depth={2}>
                            <img
                              decoding="async"
                              src={`${ImagePath}shapes/shape-17.png`}
                              alt="Hero Shape 10"
                            />
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-5b54169 animated elementor-widget elementor-widget-image"
                      data-aos="fade-up"
                      data-aos-duration={1500}
                    >
                      <div className="elementor-widget-container">
                        <img
                          loading="lazy"
                          decoding="async"
                          width={240}
                          height={370}
                          src={banner?.images[1]}
                          // src={`${ImagePath}banner/man-1.webp`}
                          className="attachment-full size-full wp-image-1268"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </MouseParallax>
      </div>
    </section>
  );
};

export default HeroBanner;
