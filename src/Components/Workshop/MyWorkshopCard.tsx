import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { Workshop } from "../../Types";

const MyWorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
    const {
        _id,
        title,
        subTitle,
        image,
        language,
        duration,
    } = workshop;

    return (
        <div className="h-full! mb-0!" data-aos="fade-up" data-aos-duration={1200}>
            <div className="edublink-single-course course-style-2 ">
                <div className="inner h-full! bg-white!">
                    <div className="thumbnail">
                        <Link to={`${ROUTES.WORKSHOP.DETAILS.replace(":id", _id)}`} className="course-thumb">
                            <img className="w-100" src={image} alt={title} />
                        </Link>

                        <div className="time-top">
                            <span className="duration">
                                <i className="icon-61"></i>
                                {language}
                            </span>
                        </div>
                    </div>

                    <div className="content ">
                        <span className="course-level text-success!">Enrolled • {duration}</span>

                        <h6 className="title">
                            <Link to={`${ROUTES.WORKSHOP.DETAILS.replace(":id", _id)}`}>
                                <span>{title}</span>
                            </Link>
                        </h6>

                        <p>{subTitle}</p>

                        <div className="read-more-btn">
                            <Link to={`${ROUTES.WORKSHOP.DETAILS.replace(":id", _id)}`} className="edu-btn btn-small btn-secondary">
                                Continue Learning<i className="icon-4"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWorkshopCard;
