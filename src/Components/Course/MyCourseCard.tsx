import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import type { Course } from "../../Types";

interface MyCourseCardProps {
  course: Course;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({ course }) => {
  if (!course) return null;

  const {
    _id,
    description,
    image = `${ImagePath}/course/course-01/course-01.jpg`,
    name,
    satisfactionRate = 5,
  } = course;

  return (
    <div className="h-full! mb-0!" data-aos="fade-up" data-aos-duration={1200}>
      <div className="edublink-single-course course-style-2 ">
        <div className="inner h-full! bg-white!">
          <div className="thumbnail">
            <Link
              to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
              className="course-thumb"
            >
              <img className="w-100" src={image} alt={name} />
            </Link>

            <div className="time-top">
              <span className="duration">
                <i className="icon-61"></i>
                Purchased
              </span>
            </div>
          </div>

          <div className="content ">
            <span className="course-level text-success!">Enrolled</span>

            <h6 className="title">
              <Link to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}>
                <span>{name}</span>
              </Link>
            </h6>

            <p>{description}</p>

            <div className="course-rating">
              <div className="edublink-course-review-wrapper">
                <div
                  className="review-stars-rated"
                  title={`${satisfactionRate} out of 5 stars`}
                >
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
                  ({satisfactionRate}.0 Ratings)
                </span>
              </div>
            </div>

            <div className="read-more-btn">
              <Link
                to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
                className="edu-btn btn-small btn-secondary"
              >
                Continue Learning<i className="icon-4"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
