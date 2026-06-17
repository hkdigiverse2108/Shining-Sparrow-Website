import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import { BreadCrumb } from "../../Components/Common";
import { MouseParallax } from "../../CoreComponents";

const PageNotFound = () => {
  return (
    <div className="">
      <BreadCrumb title="404: Error Not Found" />
      <MouseParallax>
        <section className="my-10! edublink-main-content-inner error-page-area">
          <div className="edublink-container">
            <div className="edu-error">
              <div className="thumbnail">
                <img src={`${ImagePath}404.png`} alt="404 Error" />

                <ul className="shape-group">
                  <li
                    className="shape-1 shape-image eb-mouse-animation"
                    style={{
                      transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      data-depth="2"
                      style={{
                        transform: "translate3d(-37.1px, 34.2px, 0px)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        position: "relative",
                        display: "block",
                        left: "0px",
                        top: "0px",
                      }}
                    >
                      <img src={`${ImagePath}shapes/shape-7.png`} alt="Shape" />
                    </span>
                  </li>

                  <li
                    className="shape-2 shape-image eb-mouse-animation"
                    style={{
                      transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      data-depth="-2"
                      style={{
                        transform: "translate3d(20.1px, -7.2px, 0px)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        position: "relative",
                        display: "block",
                        left: "0px",
                        top: "0px",
                      }}
                    >
                      <img src={`${ImagePath}shapes/shape-2.png`} alt="Shape" />
                    </span>
                  </li>

                  <li
                    className="shape-3 shape-image eb-mouse-animation"
                    style={{
                      transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      data-depth="2"
                      style={{
                        transform: "translate3d(-37.1px, 34.2px, 0px)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        position: "relative",
                        display: "block",
                        left: "0px",
                        top: "0px",
                      }}
                    >
                      <img
                        src={`${ImagePath}shapes/shape-1.png`}
                        alt="Shape"
                      />
                    </span>
                  </li>

                  <li
                    className="shape-4 shape-image eb-mouse-animation"
                    style={{
                      transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      data-depth="-2"
                      style={{
                        transform: "translate3d(31.7px, -32.2px, 0px)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        position: "relative",
                        display: "block",
                        left: "0px",
                        top: "0px",
                      }}
                    >
                      <img src={`${ImagePath}shapes/shape-5.png`} alt="Shape" />
                    </span>
                  </li>
                </ul>
              </div>

              <div className="content">
                <h2 className="title">404 - Page Not Found</h2>
                <h4 className="subtitle">
                  The page you are looking for does not exist.
                </h4>
                <Link to={ROUTES.HOME} className="edu-btn">
                  <i className="icon-west"></i>
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>

          <ul className="shape-group">
            <li className="shape-1">
              <img src={`${ImagePath}shapes/shape-19.png`} alt="Shape" />
            </li>
          </ul>
        </section>
      </MouseParallax>
    </div>
  );
};

export default PageNotFound;
