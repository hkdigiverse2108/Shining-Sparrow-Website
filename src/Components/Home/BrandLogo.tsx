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
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
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
                  style={{ filter: "sepia(1) saturate(3) hue-rotate(340deg) brightness(0.9)" }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-evenly items-center gap-y-6 w-full py-4 divide-x divide-gray-200">
          {brandImages?.map((item) => (
            <div
              key={item?._id}
              className="flex-1 flex justify-center items-center px-4"
              style={{ minWidth: "120px" }}
            >
              <img
                loading="lazy"
                decoding="async"
                src={item?.image}
                style={{ height: "35px", width: "auto", maxWidth: "100px", objectFit: "contain" }}
                className="mx-auto"
                alt=""
              />
            </div>
          ))}
        </div>
        <div
          className="elementor-element elementor-element-809c500 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation z-50!"
          data-id="809c500"
          data-element_type="widget"
          data-settings='{"_position":"absolute"}'
        >
          <div className="elementor-widget-container">
            <div className="edublink-animation-widget edublink-mouse-track-item">
              <span data-depth={-2}>
                  <img
                    decoding="async"
                    src="/assets/images/shapes/shape-14.png"
                    alt="shape-14"
                    style={{ filter: "sepia(1) saturate(3) hue-rotate(340deg) brightness(0.9)" }}
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
