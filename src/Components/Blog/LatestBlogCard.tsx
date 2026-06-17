import React from "react";
import type { BlogCardProps } from "../../Types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";

const LatestBlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  blog.mainImage =
    "https://demo.edublink.co/wp-content/uploads/2023/03/course-45-590x430.jpg";
  blog.coverImage =
    "https://demo.edublink.co/wp-content/uploads/2023/11/course-93-590x430.jpg";

  return (
    <Link
      to={`${ROUTES.BLOG.DETAILS.replace(":id", blog?._id)}`}
      className="edublink-recent-post-each-item"
    >
      <div className="edublink-post-widget-thumb">
        <a>
          <img
            src={
              "https://demo.edublink.co/wp-content/uploads/2023/03/course-45-590x430.jpg"
            }
            alt={blog.title}
          />
        </a>
      </div>

      <div className="media-body">
        <h5 className="entry-title">
          <a>{blog.title}</a>
        </h5>

        <div className="post-meta">
          <span className="post-icon">
            <i className="icon-27" />
          </span>
          <span className="post-meta-date">
            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LatestBlogCard;
