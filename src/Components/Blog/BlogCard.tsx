import React from "react";
import type { BlogCardProps } from "../../Types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link
      to={`${ROUTES.BLOG.DETAILS.replace(":id", blog?._id)}`}
      className="p-0! h-full! w-full! edublink-post-one-single-grid edublink-col-lg-12 eb-masonry-item edublink-col-md-12 edublink-col-sm-12 post type-post status-publish format-standard has-post-thumbnail hentry category-nutrition category-science tag-child-education tag-elearning sal-animate"
      data-aos="fade-up"
      data-aos-duration={1200}
    >
      <div className="edu-blog blog-style-6" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="inner" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="thumbnail" style={{ flexShrink: 0 }}>
            <div className="thumbnail-link" style={{ height: "220px", overflow: "hidden" }}>
              <img
                src={blog?.mainImage || blog?.coverImage}
                alt={blog?.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span className="date">
              {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="content position-top" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="read-more-btn">
              <p className="btn-icon-round">
                <i className="icon-4" />
              </p>
            </div>

            <h5 className="title mt-6!" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              <span>{blog?.title}</span>
            </h5>

            <p style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {blog?.subTitle || "alter static Text"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
