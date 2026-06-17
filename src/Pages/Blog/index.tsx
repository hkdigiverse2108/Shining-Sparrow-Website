import { BreadCrumb } from "../../Components/Common";
import { Queries } from "../../Api";
import { BlogCard } from "../../Components/Blog";
import { useState } from "react";
import Loader from "../../Components/Common/Loader";
import NoData from "../../Components/Common/NoData";

const Blog = () => {
  const LIMIT = 9;

  const [page, setPage] = useState(1);

  const { data, isLoading: isBlogLoading } = Queries.useGetAllBlogs({ page, limit: LIMIT });

  const Blogs = data?.data?.blog_data || [];

  const totalData = data?.data?.totalData || 0;
  const totalPages = Math.ceil(totalData / LIMIT);

  const start = (page - 1) * LIMIT + 1;
  const end = Math.min(page * LIMIT, totalData);

  return (
    <>
      <Loader loading={isBlogLoading} />
      <div>
        <section>
          <BreadCrumb title="Blog" />
        </section>

        <section className="my-10! container-p">
          <div className="site-content-inner edublink-container">
            <div className="edublink-main-content-inner edublink-row">
              <div id="primary" className="content-area edublink-col-lg-12">
                <main id="main" className="site-main">
                  {/* <header>
                    <h1 className="page-title screen-reader-text">Blog</h1>
                  </header> */}
                  {
                    Blogs?.length > 0 ? (
                      <>



                        <div className="edublink-course-archive-top-bar-wrapper">
                          <div className="edublink-course-archive-top-bar edublink-row">
                            <div className="edublink-col-md-6">
                              <span className="edublink-course-archive-index-count">
                                Showing{" "}
                                <span>
                                  {start}-{end}
                                </span>{" "}
                                Of <span>{totalData}</span> Results
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6!  "
                          style={{ position: "relative" }}
                        >
                          {/* edublink-row edublink-blog-post-archive-style-3 eb-masonry-grid-wrapper */}
                          {Blogs?.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                          ))}
                        </div>

                        {/* === PAGINATION === */}
                        {totalData > LIMIT && (
                          <nav className="edublink-pagination-wrapper">
                            <ul className="page-number">
                              <li className={page === 1 ? "opacity-30" : ""}>
                                <a
                                  className="page-numbers"
                                  onClick={() => page !== 1 && setPage((p) => p - 1)}
                                >
                                  {/* ‹ */}
                                  <span className="edublink-pagination-icon icon-west "></span>
                                </a>
                              </li>

                              {/* PAGE NUMBERS */}
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (p) => (
                                  <li key={p} className={p === page ? "active" : ""}>
                                    <a
                                      className={`page-numbers ${p === page ? "current" : ""
                                        }`}
                                      onClick={() => setPage(p)}
                                    >
                                      {p}
                                    </a>
                                  </li>
                                ),
                              )}

                              <li className={page === totalPages ? "opacity-30!" : ""}>
                                <a
                                  className="page-numbers"
                                  title="next"
                                  onClick={() =>
                                    page !== totalPages && setPage((p) => p + 1)
                                  }
                                >
                                  <span className="edublink-pagination-icon icon-east"></span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        )}
                      </>
                    ) : (
                      <NoData />
                    )
                  }
                </main>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
};

export default Blog;
