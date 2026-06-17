import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import type { CourseCardProps } from "../../Types";

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  let {
    _id,
    // alt,
    // href,
    // category,
    // excerpt,
    // mode,
    // rating,
    // ratingCount,
    // position,

    // totalLesson,
    // classCompleted,
    courseCategoryId,
    // courseCurriculumIds,
    description,
    // enrolledLearners,
    language,
    image = `${ImagePath}/course/course-01/course-01.jpg`,
    // mrpPrice,
    // price,
    name,
    // purchasedCoursesShow,
    // isUnlocked,
  } = course;
  // image = `${ImagePath}/course/course-01/course-01.jpg`;
  // const { name, description } = courseCategoryId;

  return (
    <Link to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`} className="h-full! mb-0!" data-aos="fade-up" data-aos-duration={1200}>
      <div className="edublink-single-course course-style-2 ">
        <div className="inner h-full! bg-white!">
          <div className="thumbnail">
            <div className="course-thumb">
              <img className="w-100" src={image} alt={image} />
            </div>

            <div className="time-top">
              <span className="duration">
                <i className="icon-61"></i>
                {language}
              </span>
            </div>
          </div>

          <div className="content ">
            <span className="course-level text-danger!">{courseCategoryId?.name}</span>

            <h6 className="title">
              <span>{name}</span>
            </h6>

            <p className="line-clamp-3">{description}</p>

            {/* Rating Stars */}
            {/* <div className="course-rating">
              <div className="edublink-course-review-wrapper">
                <div className="review-stars-rated" title={`${satisfactionRate} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div className="review-star" key={i}>
                      <span className="far">
                        <svg width="17" height="16" viewBox="0 0 17 16">
                          <g fill="#FFB606">
                            <path d="M8.5,0L10.9,6.15H17L11.53,9.84L13.96,16L8.5,12.3L3.03,16L5.46,9.84L0,6.15H6.07L8.5,0Z" />
                          </g>
                        </svg>
                      </span>

                      <span className="fas">
                        <svg width="17" height="16" viewBox="0 0 17 16">
                          <g fill="#FFB606">
                            <polygon points="8.5 12.3 3.03 16 5.46 9.84 0 6.15 6.07 6.15 8.5 0 10.92 6.15 17 6.15 11.53 9.84 13.96 16" />
                          </g>
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>

                <span>
                  ({satisfactionRate}/ 5.0 Ratings)
                </span>
              </div>
            </div> */}

            <div className="read-more-btn">
              <button className="edu-btn btn-small btn-secondary">
                Enroll Now<i className="icon-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
