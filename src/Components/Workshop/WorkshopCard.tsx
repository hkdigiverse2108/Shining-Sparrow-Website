import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { Workshop } from "../../Types";

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
    const {
        _id,
        title,
        subTitle,
        image,
        language,
        duration,
    } = workshop;

    return (
        <Link to={`${ROUTES.WORKSHOP.DETAILS.replace(":id", _id)}`} className="h-full! mb-0!" data-aos="fade-up" data-aos-duration={1200}>
            <div className="edublink-single-course course-style-2 ">
                <div className="inner h-full! bg-white!">
                    <div className="thumbnail">
                        <div className="course-thumb">
                            <img className="w-100" src={image} alt={title} />
                        </div>

                        <div className="time-top">
                            <span className="duration">
                                <i className="icon-61"></i>
                                {language}
                            </span>
                        </div>
                    </div>

                    <div className="content ">
                        <span className="course-level text-danger!">{duration}</span>

                        <h6 className="title">
                            <span>{title}</span>
                        </h6>

                        <p>{subTitle}</p>

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

export default WorkshopCard;
