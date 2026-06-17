import { type FC } from "react";
import { MouseParallax } from "../../CoreComponents";
import { ImagePath, ROUTES } from "../../Constants";
import { NavLink } from "react-router-dom";

interface BreadCrumbProp {
  title: string;
}

const BreadCrumb: FC<BreadCrumbProp> = ({ title }) => {
  return (
    <MouseParallax>
      <div className="edublink-page-title-area edublink-default-breadcrumb  py-20! ">
        <div className="edublink-container">
          <div className="edublink-page-title">
            <h1 className="entry-title">{title}</h1>
          </div>
          <div className="edublink-breadcrumb-wrapper">
            <nav className="edublink-breadcrumb">
              <ul className="breadcrumb">
                <li>
                  <NavLink to={ROUTES.HOME}>Home</NavLink>{" "}
                </li>
                <li>
                  <span className="">{title}</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="shape-dot-wrapper shape-wrapper edublink-d-xl-block edublink-d-none">
          <div className="shape-image shape-1">
            <span></span>
          </div>
          <div className="shape-image shape-2">
            <span></span>
          </div>
          <div data-depth={-2} className="shape-image eb-mouse-animation shape-3">
            <span>
              <img src={`${ImagePath}shapes/shape-1.png`} alt="About Shape 5" />
            </span>
           
          </div>
          <div data-depth={-2} className="shape-image eb-mouse-animation shape-4">
            <span>
              <img decoding="async" src={`${ImagePath}shapes/shape-2.png`} alt="shape-03" />
            </span>
          </div>
          <div data-depth={2} className="shape-image eb-mouse-animation shape-5">
            <span>
              <img decoding="async" src={`${ImagePath}shapes/shape-3.png`} alt="shape-03" />
            </span>
          </div>
        </div>
      </div>
    </MouseParallax>
  );
};

export default BreadCrumb;
