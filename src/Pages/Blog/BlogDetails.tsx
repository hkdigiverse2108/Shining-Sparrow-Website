import { Link, useParams } from "react-router-dom";
import { Queries } from "../../Api";
import { BlogCard } from "../../Components/Blog";
import { BreadCrumb, ShareButtons } from "../../Components/Common";
import { formatDateTime } from "../../Utils";
import { ROUTES } from "../../Constants";
import Loader from "../../Components/Common/Loader";

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blogApi, isLoading: isBlogLoading } = Queries.useGetSingleBlog(id);
  const { data: allBlogApi, isLoading: isAllBlogLoading } = Queries.useGetAllBlogs();

  const SingleBlog = blogApi?.data;
  const Blogs = allBlogApi?.data?.blog_data;

  const latestBlogs = Blogs?.filter((blog) => blog?._id !== id).slice(0, 3);

  const paginationBlog = Blogs?.filter((blog) => blog?._id !== id).slice(0, 2);

  const allCategories = Blogs?.reduce((acc: any[], blog: any) => {
    const category = blog?.category;
    if (!category) return acc;

    const existing = acc.find((item) => item.category === category);

    if (existing) {
      existing.total += 1;
    } else {
      acc.push({ category, total: 1 });
    }

    return acc;
  }, []);

  const isLoading = isBlogLoading || isAllBlogLoading;

  return (
    <>
      <Loader loading={isLoading} />

      <div>
        <div>
          <BreadCrumb title="Blog Details" />
        </div>
        <div
          id="content"
          className="site-content edublink-container my-10! w-full!  "
        >
          <div className=" ">
            <div id="primary" className="content-area  w-full!">
              <main id="main" className="site-main eb-post-details-page mx-0! ">
                <article className="edublink-single-post edu-blog post-15416 post type-post status-publish format-standard has-post-thumbnail hentry category-technology tag-design tag-development">
                  <div className="blog-details-top">
                    <span className="edublink-post-cat">
                      <a>{SingleBlog?.category}</a>
                    </span>
                    <h3 className="post-main-title">{SingleBlog?.title}</h3>
                    <ul className="blog-meta">
                      <li>
                        <i className="icon-27"></i>{" "}
                        {formatDateTime(SingleBlog?.createdAt)}
                      </li>
                      <li>
                        <i className="icon-58"></i>
                        {SingleBlog?.author}
                      </li>
                    </ul>
                  </div>

                  <div className="post-thumbnail">
                    <img
                      width="1200"
                      height="800"
                      src={SingleBlog?.mainImage}
                      className="attachment-full size-full wp-post-image"
                      alt=""
                    />
                  </div>

                  <div className="entry-content">
                    <div
                      data-elementor-type="wp-post"
                      data-elementor-id="15416"
                      className="elementor elementor-15416"
                    >
                      <section
                        className="elementor-section elementor-top-section elementor-element elementor-element-7c9c6c8 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="7c9c6c8"
                      >
                        <div className="elementor-container elementor-column-gap-no">
                          <div
                            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-75a82b0"
                            data-id="75a82b0"
                          >
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-9a53172 elementor-widget elementor-widget-text-editor"
                                data-id="9a53172"
                              >
                                {SingleBlog?.quote && (
                                  <blockquote>
                                    <p>{SingleBlog?.quote}</p>
                                    <p>
                                      <cite>
                                        {SingleBlog?.author}
                                        <br />
                                      </cite>
                                    </p>
                                  </blockquote>
                                )}

                                <div
                                  className="elementor-widget-container"
                                  dangerouslySetInnerHTML={{
                                    __html: SingleBlog?.content || "",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Tags, Social Share */}
                    <div className="edublink-tag-social-share-wrapper">
                      <div className="edublink-tag-social-share edublink-row">
                        <div className="edublink-col-md-12 flex! items-start! text-start!">
                          <ShareButtons
                            url={window.location.href}
                            title={SingleBlog?.title}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Post Navigation */}
                    <div className="edublink-post-nav-prev-next edublink-row">
                      {paginationBlog?.map((blog, index) => {
                        return (
                          <Link
                            key={blog._id}
                            to={`${ROUTES.BLOG.DETAILS.replace(
                              ":id",
                              blog?._id,
                            )}`}
                            className="edublink-col-md-6"
                          >
                            <div
                              className={`edublink-single-post-nav ${index === 0
                                ? " edublink-prev-post"
                                : "edublink-next-post"
                                }`}
                            >
                              {index === 0 && <i className="icon-west"></i>}
                              <span className="post-title">
                                {blog?.title}
                                {/* Voices from the Learning Education Hub */}
                              </span>
                              {index === 1 && <i className="icon-east"></i>}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </main>
            </div>

            <aside id="secondary" className="widget-area w-full!">
              <div className="widget-area-wrapper ">
                {/* Latest Posts */}
                <section
                  id="edublinkcore_recent_posts_widget-3"
                  className="widget widget_edublinkcore_recent_posts_widget px-0!"
                >
                  <h2 className="widget-title">Latest Post</h2>

                  <div
                    className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6!  "
                    style={{ position: "relative" }}
                  >
                    {latestBlogs?.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </section>

                {/* Categories */}
                <section
                  id="categories-2"
                  className="widget widget_categories px-0!"
                >
                  <h2 className="widget-title">Categories</h2>
                  <ul>
                    {allCategories?.map((item, index) => (
                      <li key={index} className="cat-item cat-item-72">
                        <a>{item?.category}</a> ({item?.total})
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>

  );
};

export default BlogDetails;
