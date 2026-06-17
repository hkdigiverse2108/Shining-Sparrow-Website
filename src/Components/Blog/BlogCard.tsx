import React from "react";
import type { BlogCardProps } from "../../Types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  blog.mainImage =
    "https://demo.edublink.co/wp-content/uploads/2023/03/course-45-590x430.jpg";
  blog.coverImage =
    "https://demo.edublink.co/wp-content/uploads/2023/11/course-93-590x430.jpg";
  return (
    <Link
      to={`${ROUTES.BLOG.DETAILS.replace(":id", blog?._id)}`}
      className=" p-0!  h-full! w-full! edublink-post-one-single-grid edublink-col-lg-12 eb-masonry-item edublink-col-md-12 edublink-col-sm-12 post type-post status-publish format-standard has-post-thumbnail hentry category-nutrition category-science tag-child-education tag-elearning sal-animate"
      data-aos="fade-up"
      data-aos-duration={1200}
    >
      <div className="edu-blog blog-style-6">
        <div className="inner">
          <div className="thumbnail">
            <div className="thumbnail-link">
              <img
                src={blog?.mainImage || blog?.coverImage}
                alt={blog?.title}
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

          <div className="content position-top">
            <div className="read-more-btn">
              <p className="btn-icon-round">
                <i className="icon-4" />
              </p>
            </div>

            <div className="category-wrap ">
              <span>{blog?.category}</span>
            </div>

            <h5 className="title mt-6!">
              <span>{blog?.title}</span>
            </h5>

            <p>{blog?.subTitle || "alter static Text"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
