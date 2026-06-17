import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../Components/Common";
import { Queries } from "../../Api";
import {
    WorkshopCurriculumSection,
    WorkshopSidebarSection,
    WorkshopCard,
} from "../../Components/Workshop";
import { CourseOverviewSection, CourseFaqSection } from "../../Components/Course";
import Loader from "../../Components/Common/Loader";

const WorkshopDetails = () => {
    const { id } = useParams();

    const { data: allWorkshopData, isLoading: AllWorkshopLoading } = Queries.useGetAllWorkshops();
    const { data: Workshop, isLoading: WorkshopLoading } = Queries.useGetSingleWorkshop(id);
    const singleWorkshop = Workshop?.data;

    const { data: workshopCurriculum } = Queries.useGetWorkshopCurriculum(id);

    const AllWorkshops = allWorkshopData?.data?.workshop_data || [];
    const AllWorkshopCurriculum = workshopCurriculum?.data?.workshop_curriculum_data || [];

    const isLoading = AllWorkshopLoading || WorkshopLoading;

    return (
        <>
            <Loader loading={isLoading} />
            <div className="lp-archive-courses">
                <BreadCrumb title="Workshop Details" />

                <div className="edublink-course-details-page lp-course-single-page eb-course-single-style-4 py-10!">
                    <div className="edublink-container">
                        <div className="edublink-row">
                            <div
                                id="learn-press-course"
                                className={`course-summary   ${singleWorkshop?.isUnlocked ? "edublink-col-lg-12" : "edublink-col-lg-8"} `}
                            >
                                <div className="eb-course-details-page-content">
                                    <div className="edublink-course-page-header edublink-course-page-header eb-course-details-header-4">
                                        <div className="eb-course-header-breadcrumb-content">
                                            <div className="edublink-container">
                                                <div className="edublink-course-breadcrumb-inner">
                                                    <div className="edublink-course-title">
                                                        <h1 className="entry-title">{singleWorkshop?.title}</h1>
                                                    </div>

                                                    <div className="edublink-course-header-meta">
                                                        <ul className="eb-course-header-meta-items">
                                                            <li className="category">
                                                                <i className="icon-59"></i>
                                                                <a>{singleWorkshop?.duration}</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="eb-course-single-4-preview">
                                        <div
                                            className=" edublink-course-details-card-preview after:bg-transparent! after:pointer-events-none"
                                            style={{
                                                backgroundImage: `url(${singleWorkshop?.image})`,
                                            }}
                                        ></div>
                                    </div>

                                    {/* ========================= Tabs Section ========================= */}

                                    <div className="course-content course-summary-content">
                                        <div id="learn-press-course-tabs" className="course-tabs">
                                            <input
                                                type="radio"
                                                name="learn-press-course-tab-radio"
                                                id="tab-overview-input"
                                                defaultChecked
                                                value="overview"
                                            />
                                            <input
                                                type="radio"
                                                name="learn-press-course-tab-radio"
                                                id="tab-curriculum-input"
                                                value="curriculum"
                                            />
                                            <input
                                                type="radio"
                                                name="learn-press-course-tab-radio"
                                                id="tab-faq-input"
                                                value="faq"
                                            />

                                            <ul
                                                className="learn-press-nav-tabs course-nav-tabs"
                                                data-tabs="3"
                                            >
                                                <li className="course-nav course-nav-tab-overview active">
                                                    <label htmlFor="tab-overview-input">Overview</label>
                                                </li>

                                                <li className="course-nav course-nav-tab-curriculum">
                                                    <label htmlFor="tab-curriculum-input">Curriculum</label>
                                                </li>

                                                <li className="course-nav course-nav-tab-faq">
                                                    <label htmlFor="tab-faq-input">FAQ</label>
                                                </li>
                                            </ul>

                                            <div className="course-tab-panels">
                                                <CourseOverviewSection desc={singleWorkshop?.about} title="Workshop Description" />
                                                <WorkshopCurriculumSection curriculums={AllWorkshopCurriculum} isUnlocked={singleWorkshop?.isUnlocked} />
                                                <CourseFaqSection type="workshop" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {singleWorkshop && !singleWorkshop?.isUnlocked && (
                                <WorkshopSidebarSection workshop={singleWorkshop} />
                            )}
                        </div>
                    </div>

                    <div className=" mt-22! edublink-related-course-content-wrapper edublink-container">
                        <div className="section-title">
                            <h3 className="title related-course-title">Workshops You May Like</h3>
                        </div>

                        <div className="elementor-element elementor-element-6bce914 distant-learning-course elementor-widget elementor-widget-edublink-lp-courses">
                            <div className="elementor-widget-container">
                                <div className="edublink-course-widget-wrapper flex justify-center">
                                    <div className="edublink-archive-lp-courses grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! w-full edublink-course-archive edublink-lms-courses-grid  edublink-row eb-masonry-grid-wrapper">
                                        {AllWorkshops?.slice(0, 3)?.map((workshop: any) => (
                                            <WorkshopCard key={workshop._id} workshop={workshop} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkshopDetails;
