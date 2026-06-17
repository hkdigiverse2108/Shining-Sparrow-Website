import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../Components/Common";
import { Queries } from "../../Api";
import { Rate } from "antd";
import {
  CourseOverviewSection,
  CourseCurriculumSection,
  CourseSidebarSection,
  CourseReviewSection,
  CourseFaqSection,
  CourseCard,
} from "../../Components/Course";
import Loader from "../../Components/Common/Loader";

const CourseDetails = () => {
  const { id } = useParams();

  const { data: allCourseData, isLoading: AllCourseLoading } = Queries.useGetAllCourses();
  const { data: Course, isLoading: CourseLoading } = Queries.useGetSingleCourse(id);
  const singleCourse = Course?.data;
  const { data: ratingSummary } = Queries.useGetTestimonialRatingSummary(
    singleCourse?._id || "69259b3b0eae08a2ef76d404",
  );

  // const { data: courseCurriculum } = Queries.useGetCourseCurriculum(id);
  const { data: courseLessons } = Queries.useGetCourseLessons(id);

  const AllCourses = allCourseData?.data?.course_data || [];
  // const AllCourseCurriculum =
  //   courseCurriculum?.data?.course_curriculum_data || [];
  const AllCourseLessons = courseLessons?.data?.course_lesson_data || [];
  const ratingData = ratingSummary?.data;

  const isLoading = AllCourseLoading || CourseLoading;

  return (
    <>
      <Loader loading={isLoading} />
      <div className="lp-archive-courses">
        <BreadCrumb title="Course Details" />

        <div className="edublink-course-details-page lp-course-single-page eb-course-single-style-4 py-10!">
          <div className="edublink-container">
            <div className="edublink-row">
              <div
                id="learn-press-course"
                className={`course-summary   ${singleCourse?.isUnlocked ? "edublink-col-lg-12" : "edublink-col-lg-8"} `}
              >
                <div className="eb-course-details-page-content">
                  <div className="edublink-course-page-header edublink-course-page-header eb-course-details-header-4">
                    <div className="eb-course-header-breadcrumb-content">
                      <div className="edublink-container">
                        <div className="edublink-course-breadcrumb-inner">
                          <div className="edublink-course-title">
                            <h1 className="entry-title">{singleCourse?.name}</h1>
                          </div>

                          <div className="edublink-course-header-meta">
                            <ul className="eb-course-header-meta-items">
                              <li className="category">
                                <i className="icon-59"></i>
                                <a>{singleCourse?.courseCategoryId?.name}</a>
                              </li>

                              <li className="rating">
                                <div className="edublink-course-review-wrapper">
                                  <Rate
                                    allowHalf
                                    defaultValue={ratingData?.averageRating || 0}
                                    disabled
                                    style={{ fontSize: "14px", color: "#FFB606" }}
                                  />
                                  <span>
                                    ({ratingData?.totalRated || 0} Reviews)
                                  </span>
                                </div>
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
                        backgroundImage: `url(${singleCourse?.image})`,
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
                      <input
                        type="radio"
                        name="learn-press-course-tab-radio"
                        id="tab-reviews-input"
                        value="reviews"
                      />

                      <ul
                        className="learn-press-nav-tabs course-nav-tabs"
                        data-tabs="4"
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

                        <li className="course-nav course-nav-tab-reviews">
                          <label htmlFor="tab-reviews-input">Reviews</label>
                        </li>
                      </ul>

                      <div className="course-tab-panels">
                        <CourseOverviewSection desc={singleCourse?.description} title="Course Description" />
                        <CourseCurriculumSection lessons={AllCourseLessons} isUnlocked={singleCourse?.isUnlocked} />
                        <CourseFaqSection type="course" />
                        <CourseReviewSection courseId={singleCourse?._id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!singleCourse?.isUnlocked && (
                <CourseSidebarSection course={singleCourse} />
              )}
            </div>
          </div>

          <div className=" mt-22! edublink-related-course-content-wrapper edublink-container">
            <div className="section-title">
              <h3 className="title related-course-title">Courses You May Like</h3>
            </div>

            <div className="elementor-element elementor-element-6bce914 distant-learning-course elementor-widget elementor-widget-edublink-lp-courses">
              <div className="elementor-widget-container">
                <div className="edublink-course-widget-wrapper flex justify-center">
                  <div className="edublink-archive-lp-courses grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! w-full edublink-course-archive edublink-lms-courses-grid  edublink-row eb-masonry-grid-wrapper">
                    {AllCourses?.slice(0, 3)?.map((course: any) => (
                      <CourseCard key={course._id} course={course} />
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

export default CourseDetails;
