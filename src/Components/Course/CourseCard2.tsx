import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import type { Course } from "../../Types";

export interface CourseCardProps {
  course: Course;
}

const CourseCard2: React.FC<CourseCardProps> = ({ course }) => {
  // const {
  //   level,
  //   title,
  //   image,
  //   link,
  //   duration,
  //   rating,
  //   ratingsCount,
  //   price,
  //   oldPrice,
  //   lessons,
  //   students,
  //   description,
  // } = course;

  let {
    _id,
    // title,
    // alt,
    // href,
    // category,
    // excerpt,
    // mode,
    // rating,
    // ratingCount,
    // position,

    totalLesson,
    // classCompleted,
    // courseCategoryId,
    // courseCurriculumIds,
    description,
    duration,
    enrolledLearners,
    language,
    image = `${ImagePath}/course/course-01/course-01.jpg`,
    mrpPrice,
    price,
    name,
    // purchasedCoursesShow,
    satisfactionRate,
    // isUnlocked,
  } = course;
  image = `${ImagePath}/course/course-01/course-01.jpg`;

  return (
    <div
      className="swiper-slide shadow h-fit!"
      data-aos="fade-up"
      data-aos-duration={1200}
    >
      <div className="edublink-single-course course-style-1">
        <div className="inner">
          <div className="thumbnail">
            <a className="course-thumb">
              <img className="w-100" src={image} alt={name} />
            </a>

            <div className="time-top">
              <span className="duration">
                <i className="icon-61"></i>
                {duration}
              </span>
            </div>
          </div>

          <div className="content">
            <span className="course-level">{language}</span>

            <h6 className="title">
              <a>{name}</a>
            </h6>

            {/* Rating */}
            <div className="course-rating">
              <div className="edublink-course-review-wrapper">
                <div
                  className="review-stars-rated"
                  style={{ display: "flex", position: "relative" }}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div className="review-star" key={i}>
                      <span className="far">★</span>
                      <span
                        className="fas"
                        style={{ width: i <= satisfactionRate ? "100%" : "0%" }}
                      >
                        ★
                      </span>
                    </div>
                  ))}
                </div>

                <span>
                  ({satisfactionRate}.0 / {satisfactionRate} satisfactionRate)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="course-price">
              <span className="course-item-price">
                {mrpPrice && <span className="origin-price">${mrpPrice}</span>}
                <span className="price">${price}</span>
              </span>
            </div>

            {/* Meta */}
            <ul className="course-meta">
              <li>
                <i className="icon-24"></i>
                {totalLesson} Lessons
              </li>
              <li>
                <i className="icon-25"></i>
                {enrolledLearners} Students
              </li>
            </ul>
          </div>
        </div>

        {/* Hover */}
        <div className="course-hover-content-wrapper">
          <div className="wishlist-top-right">
            <button className="edublink-wishlist-wrapper edublink-lp-non-logged-user"></button>
          </div>
        </div>

        <div className="course-hover-content">
          <div className="content">
            <span className="course-level">{language}</span>

            <h6 className="title">
              <a>{name}</a>
            </h6>

            {/* Rating hover */}
            <div className="course-rating">
              <div className="edublink-course-review-wrapper">
                <div
                  className="review-stars-rated"
                  style={{ display: "flex", position: "relative" }}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div className="review-star" key={i + "hover"}>
                      <span className="far">★</span>
                      <span
                        className="fas"
                        style={{ width: i <= satisfactionRate ? "100%" : "0%" }}
                      >
                        ★
                      </span>
                    </div>
                  ))}
                </div>

                <span>
                  ({satisfactionRate}.0 / {satisfactionRate} Ratings)
                </span>
              </div>
            </div>

            <div className="course-price">
              <span className="course-item-price">
                {mrpPrice && <span className="origin-price">${mrpPrice}</span>}
                <span className="price">${price}</span>
              </span>
            </div>

            <p>{description}</p>

            <ul className="course-meta">
              <li>
                <i className="icon-24"></i>
                {totalLesson} Lessons
              </li>
              <li>
                <i className="icon-25"></i>
                {enrolledLearners} Students
              </li>
            </ul>

            <Link
              to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
              className="edu-btn btn-secondary btn-small"
            >
              Enroll Now <i className="icon-4"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard2;
