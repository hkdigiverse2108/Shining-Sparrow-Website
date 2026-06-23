import { useEffect, useState } from "react";
// import StickyBar from "../Utils/StickyBar";
import { ImagePath, ROUTES } from "../Constants";
import { GetHeaderMenuItems } from "../Utils/GetHeaderMenuItems";
import type { MenuItem } from "../Types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Queries } from "../Api";
import { useAppDispatch, useAppSelector } from "../Store/Hook";
import { setLogoutModalOpen } from "../Store/Slices/ModalSlice";

const calcDays = (date: Date) => {
  const createdAt: any = new Date(date)
  const now: any = new Date()
  const diffTime = now - createdAt
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  if (diffDays <= 7) return "New"
  return "Featured"
}

const Header = () => {
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [fix, setFix] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);


  const { data: blogData } = Queries.useGetAllBlogs({ limit: 100 });
  const allBlogs = blogData?.data?.blog_data;
  const latestThreeBlogs = allBlogs?.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  const scroll = 300;
  useEffect(() => {
    const handleScroll = () => {
      setFix(window.scrollY > scroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  useEffect(() => {
    const menuItems = GetHeaderMenuItems() || [];
    setMenuItems(menuItems);
  }, []);

  return (
    <>
      <header
        className={`site-header theme-header-1 header-get-sticky ${fix ? "edublink-header-sticky " : ""
          }`}
      >
        <div className="edublink-header-area edublink-navbar edublink-navbar-expand-lg">
          <div className="edublink-container-fluid">
            <div className="eb-header-navbar edublink-align-items-center">
              <div className="site-branding site-logo-info overflow-hidden!">
                <div className="logo-wrapper  ">
                  <Link
                    to="/"
                    className="navbar-brand site-main-logo"
                    rel="home"
                  >
                    <img
                      width={123}
                      height={50}
                      src={`${ImagePath}logo/Logo.png`}
                      className="site-logo h-auto object-contain"
                      alt="logo"
                      decoding="async"
                    />
                  </Link>
                </div>
              </div>

              <div className="  edublink-theme-header-nav edublink-d-none edublink-d-xl-block">
                <nav
                  id="site-navigation"
                  className=" flex! justify-center! main-navigation edublink-theme-nav edublink-navbar-collapse"
                >
                  <div className="edublink-navbar-primary-menu ">
                    <div
                      id="primary-menu-container-id"
                      className="primary-menu-container-class"
                    >
                      <ul
                        id="primary-menu-custom-id"
                        className="edublink-default-header-navbar edublink-navbar-nav edublink-navbar-right"
                      >
                        {menuItems.map((item, index) => {
                          const isBlog = item.Title === "Blog";
                          const hasFeaturedBlogs = isBlog && latestThreeBlogs && latestThreeBlogs.length > 0;

                          return (
                            <li
                              key={index}
                              id={`menu-item-${index}`}
                              className={`menu-item menu-item-type-custom menu-item-object-custom nav-item menu-align-left ${hasFeaturedBlogs ? "menu-item-has-children dropdown" : ""
                                }`}
                            >
                              <NavLink to={item?.link || ""} className="nav-link">
                                {item?.Title}
                              </NavLink>
                              {hasFeaturedBlogs && (
                                <ul className="edublink-dropdown-menu  ">
                                  {latestThreeBlogs.map((blog, idx) => (
                                    <li key={idx} className="cat-item  ">
                                      <Link to={ROUTES.BLOG.DETAILS.replace(":id", blog._id)} className=" px-5!">
                                        {blog.title}
                                        <span className="eb-menu-new-badge w-fit h-fit  "> {calcDays(blog.createdAt)}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="edublink-header-right-side gap-0! ">
                {isAuthenticated ? (
                  <nav className="main-navigation flex! items-end justify-end! ">
                    <ul className="category-menu edublink-navbar-nav  w-fit">
                      <li className="cat-menu-item dropdown  w-fit!">
                        <div className="w-fit! flex items-center justify-center gap-2 border border-gray-300 bg-white shadow rounded-md p-2! cursor-pointer ">
                          {user?.profilePhoto ? (
                            <figure className="w-12 h-12 mb-0! flex">
                              <img src={user.profilePhoto} alt="User" className="w-full! h-full! rounded-full object-cover!" />
                            </figure>
                          ) : (
                            <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: "linear-gradient(135deg, #F26522, #FFA726)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(242,101,34,0.35)", }} >
                              <span style={{ color: "#fff", fontWeight: "700", fontSize: "20px", lineHeight: 1, textTransform: "uppercase", }} >
                                {(user?.fullName || "U").charAt(0)}
                              </span>
                            </div>
                          )}
                          <section className="flex flex-col gap-0! max-sm:hidden! ">
                            <p className="text-xl font-bold my-0! capitalize! ">
                              {user?.fullName || "User"}
                            </p>
                            {user?.designation && (
                              <p className="text-sm my-0! opacity-70!">
                                {user?.designation}
                              </p>
                            )}
                          </section>
                        </div>
                        <ul className="edublink-dropdown-menu -left-20! w-fit!">
                          <li className="menu-item">
                            <Link to={ROUTES.USER.PROFILE}>
                              <i className="icon-70" /> Profile
                            </Link>
                          </li>
                          <li className="menu-item">
                            <a
                              onClick={() =>
                                dispatch(setLogoutModalOpen(true))
                              }
                              className="cursor-pointer!"
                            >
                              <i className="icon-4" />  Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                ) : (
                  <button
                    onClick={() => {
                      window.location.href = import.meta.env.VITE_LOGIN_URL;
                    }}
                    className="main-header-btn edu-btn btn-medium"
                  >
                    Login <i className="icon-4" />
                  </button>

                )}
                <div className="quote-icon edublink-theme-nav-responsive hamburger-icon ms-3! p-0! ">
                  <div
                    className="edublink-mobile-hamburger-menu"
                    onClick={() => setMobileMenu(!isMobileMenu)}
                  >
                    <span>
                      <i className="icon-54" />
                    </span>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >
      </header >

      <div className="edublink-mobile-menu">
        <div className="edublink-mobile-menu-overlay" />
        <div
          className={`edublink-mobile-menu-nav-wrapper ${isMobileMenu ? "edublink-mobile-menu-visible" : ""
            }`}
        >
          <div className="responsive-header-top">
            <div className="responsive-header-logo">
              <div className="logo-wrapper">
                <Link to="/" className="navbar-brand site-main-logo" rel="home">
                  <img
                    width={123}
                    height={50}
                    src={`${ImagePath}logo/Logo.png`}
                    className="site-logo h-auto object-contain"
                    alt="edublink"
                    decoding="async"
                  />
                </Link>
              </div>
            </div>
            <div
              className="edublink-mobile-menu-close"
              onClick={() => setMobileMenu(!isMobileMenu)}
            >
              <span>
                <i className="icon-73" />
              </span>
            </div>
          </div>
          <ul
            id="edublink-mobile-menu-item"
            className="edublink-mobile-menu-item metismenu"
          >


            {menuItems.map((item, index) => {
              const isBlog = item.Title === "Blog";
              const hasFeaturedBlogs =
                isBlog && latestThreeBlogs && latestThreeBlogs.length > 0;

              return (
                <li
                  key={index}
                  className={`menu-item menu-item-type-custom menu-item-object-custom nav-item menu-item-13617 dropdown menu-align-left ${hasFeaturedBlogs ? "menu-item-has-children" : ""
                    } ${activeSubMenu === item.Title ? "mm-active" : ""}`}
                  onClick={() => {
                    if (hasFeaturedBlogs) {
                      setActiveSubMenu(
                        activeSubMenu === item.Title ? null : item.Title
                      );
                    }
                  }}
                >
                  <NavLink
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const linkWidth = rect.width;

                      // If click is within the rightmost 55px (where the + icon is)
                      if (hasFeaturedBlogs && linkWidth - clickX < 55) {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveSubMenu(
                          activeSubMenu === item.Title ? null : item.Title
                        );
                      } else {
                        setMobileMenu(false);
                      }
                    }}
                    aria-expanded={activeSubMenu === item.Title ? "true" : "false"}
                    to={item?.link || ""}
                    className="nav-link"
                  >
                    {item?.Title}
                  </NavLink>
                  {hasFeaturedBlogs && (
                    <ul
                      className={`edublink-dropdown-menu ${activeSubMenu === item.Title ? "block" : "hidden"
                        }`}
                    >
                      {latestThreeBlogs.map((blog, idx) => (
                        <li key={idx} className="cat-item">
                          <Link
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileMenu(false);
                            }}
                            to={ROUTES.BLOG.DETAILS.replace(":id", blog._id)}
                          >
                            {blog.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
