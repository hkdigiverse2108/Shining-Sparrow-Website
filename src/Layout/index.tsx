import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import VideoModal from "../Components/Common/VideoModal";
import ImageModal from "../Components/Gallary/ImageModal";
import LogoutModal from "../Components/Common/LogoutModal";
import ScrollToTop from "../Components/Common/ScrollToTop";
import AuthModal from "../Components/Common/AuthModal";
import SettingsInitializer from "../Components/Common/SettingsInitializer";

const Layout = () => {
  return (
    <div id="page" className="site relative">
      <SettingsInitializer />
      <ScrollToTop />
      <Header />
      <div id="content" className="site-content">
        <div className="site-content-inner edublink-page-container edublink-container">
          <div className="edublink-main-content-inner edublink-row">
            <div id="primary" className="content-area edublink-col-lg-12">
              <main id="main" className="site-main">
                <article
                  id="post-1233"
                  className="edublink-single-page post-1233 page type-page status-publish hentry"
                >
                  <div className="entry-content">
                    <div
                      data-elementor-type="wp-page"
                      data-elementor-id={1233}
                      className="elementor elementor-1233"
                    >
                      <Outlet />
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <VideoModal />
      <ImageModal />
      <LogoutModal />
      <AuthModal />
    </div>
  );
};

export default Layout;
