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
  const AllSettings = useAppSelector((state) => state.settings.settings);

  const { data } = Queries.useGetCourseCategory();
  const allCategory = data?.data?.course_category_data;

  const { data: blogData } = Queries.useGetAllBlogs({ limit: 100 });
  const allBlogs = blogData?.data?.blog_data;
  const featuredBlogs = allBlogs?.filter((blog) => blog.isFeatured);

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
                    to=""
                    className="navbar-brand site-main-logo"
                    rel="home"
                  >
                    <img
                      width={158}
                      height={50}
                      src={AllSettings?.logo}
                      className="site-logo h-fit!"
                      alt="logo"
                      decoding="async"
                    />
                  </Link>
                </div>
              </div>
              <div className="header-category">
                <nav className="main-navigation">
                  <ul className="category-menu edublink-navbar-nav">
                    {allCategory?.length && (
                      <li className="cat-menu-item dropdown">
                        <a className="cat-menu-anchor-item">
                          <i className="icon-1" />
                          Category
                        </a>
                        <ul className="edublink-dropdown-menu">
                          {allCategory?.map((item, index) => {
                            return (
                              <li key={index} className="cat-item">
                                <Link to={ROUTES.COURSE.BASE} state={item?._id}>
                                  {item?.name}
                                </Link>
                              </li>
                            );
                          })}

                        </ul>
                      </li>
                    )}
                  </ul>
                </nav>
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
                          const hasFeaturedBlogs = isBlog && featuredBlogs && featuredBlogs.length > 0;

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
                                  {featuredBlogs.map((blog, idx) => (
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
                          <figure className="w-12 h-12 mb-0! flex">
                            <img
                              src={
                                user?.profilePhoto ||
                                `${ImagePath}/others/author.png`
                              }
                              alt="User"
                              className="w-full! h-full! rounded-full object-cover!"
                            />
                          </figure>
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
                    onClick={() => navigate(ROUTES.AUTH.BASE)}
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
                <Link to="" className="navbar-brand site-main-logo" rel="home">
                  <img
                    width={158}
                    height={50}
                    src={`${ImagePath}/logo/logo-dark.png`}
                    className="site-logo"
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
            {allCategory?.length && (
              <li
                className={`menu-item menu-item-type-custom menu-item-object-custom  menu-item-has-children nav-item menu-item-13616 dropdown menu-align-left ${activeSubMenu === "Category" ? "mm-active" : ""
                  }`}
                onClick={() => setActiveSubMenu(activeSubMenu === "Category" ? null : "Category")}
              >
                <a
                  className="nav-link"
                  aria-expanded={activeSubMenu === "Category" ? "true" : "false"}
                >
                  Category
                </a>
                <ul
                  className={`edublink-dropdown-menu ${activeSubMenu === "Category" ? "block" : "hidden"
                    }`}
                >
                  {allCategory?.map((item, index) => {
                    return (
                      <li key={index} className="cat-item">
                        <Link
                          onClick={() => setMobileMenu(!isMobileMenu)}
                          to={ROUTES.COURSE.BASE}
                          state={item?._id}
                        >
                          {item?.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}

            {menuItems.map((item, index) => {
              const isBlog = item.Title === "Blog";
              const hasFeaturedBlogs =
                isBlog && featuredBlogs && featuredBlogs.length > 0;

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
                      if (hasFeaturedBlogs) {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveSubMenu(
                          activeSubMenu === item.Title ? null : item.Title
                        );
                      } else {
                        setMobileMenu(false);
                      }
                    }}
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
                      {featuredBlogs.map((blog, idx) => (
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
