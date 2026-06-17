import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import type { TrustedPartner } from "../../Types";


const BrandLogo = ({ brandImages }: { brandImages?: TrustedPartner[] }) => {

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-94388e3 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="94388e3"
      data-element_type="section"
      data-settings='{"background_background":"classic"}'
    >
      <MouseParallax className="elementor-container elementor-column-gap-extended ">
        {/* BRAND  */}

        <div
          className="elementor-element elementor-element-f8415f2 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation"
          data-id="f8415f2"
          data-element_type="widget"
          data-settings='{"_position":"absolute"}'
          data-widget_type="edublink-animation.default"
        >
          <div className="elementor-widget-container">
            <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
              <span data-depth={-2}>
                <img
                  decoding="async"
                  src={`${ImagePath}shapes/shape-7.png`}
                  alt="About-Shape-2"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2  sm:grid-cols-4  xl:grid-cols-8 gap-2  w-full! justify-center items-center divide-x divide-gray-200 ">
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
        <div
          className="elementor-element elementor-element-809c500 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation"
          data-id="809c500"
          data-element_type="widget"
          data-settings='{"_position":"absolute"}'
        >
          <div className="elementor-widget-container">
            <div className="edublink-animation-widget edublink-mouse-track-item">
              <span data-depth={-2}>
                <img
                  decoding="async"
                  src={`${ImagePath}shapes/shape-14.png`}
                  alt="shape-41"
                />
              </span>
            </div>
          </div>
        </div>
      </MouseParallax>
    </section>
  );
};

export default BrandLogo;
