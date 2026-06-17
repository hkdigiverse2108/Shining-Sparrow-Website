import { BreadCrumb } from "../../Components/Common";
import { Queries } from "../../Api";
import { CourseCard, MyCourseCard } from "../../Components/Course";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../Store/Hook";
import Loader from "../../Components/Common/Loader";
import NoData from "../../Components/Common/NoData";

const Course = () => {
  const LIMIT = 9;
  const MY_COURSES_LIMIT = 6;
  const [page, setPage] = useState(1);
  const [myCoursesPage, setMyCoursesPage] = useState(1);

  const location = useLocation();
  const id = location.state;
  const { isAuthenticated } = useAppSelector((state) => state.user);

  // 1. Dynamic Pagination for "All Courses"
  const { data: courseData, isLoading: isCourseLoading } = Queries.useGetAllCourses({
    page,
    limit: LIMIT,
    courseCategoryId: id,
  });

  const Courses = courseData?.data?.course_data || [];
  const totalData = courseData?.data?.totalData || 0;
  const totalPages = Math.ceil(totalData / LIMIT);

  const start = totalData > 0 ? (page - 1) * LIMIT + 1 : 0;
  const end = Math.min(page * LIMIT, totalData);

  // 2. Static Pagination for "My Courses" (Fetch all once)
  const { data: myCoursesAllData, isLoading: isMyCoursesLoading } =
    Queries.useGetAllCourses({}, { enabled: isAuthenticated });

  const allMyCourses = myCoursesAllData?.data?.course_data || [];
  const myCourses = allMyCourses.filter((course) => course?.isUnlocked === true);
  const totalMyCourses = myCourses?.length || 0;
  const totalMyCoursesPages = Math.ceil(totalMyCourses / MY_COURSES_LIMIT);

  const isAppLoading = isCourseLoading || isMyCoursesLoading;

  return (
    <>
      <Loader loading={isAppLoading} />
      <div>
        <section>
          <BreadCrumb title="Course" />
        </section>
        <div id="content" className="site-content my-10! container-p">
          <div className="site-content-inner edublink-container">
            <div className="edublink-main-content-inner">
              {/* MY COURSES SECTION */}
              {isAuthenticated && myCourses.length > 0 && (
                <div className="mb-10!">
                  <div className="edublink-course-archive-top-bar-wrapper">
                    <div className="edublink-course-archive-top-bar edublink-row">
                      <div className="edublink-col-md-6">
                        <h3 className="mb-0! text-2xl font-bold!">My Courses</h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1! sm:grid-cols-2! md:grid-cols-3! gap-9!  ">
                    {myCourses
                      .slice(
                        (myCoursesPage - 1) * MY_COURSES_LIMIT,
                        myCoursesPage * MY_COURSES_LIMIT,
                      )
                      .map((myCourse) => (
                        <MyCourseCard key={myCourse._id} course={myCourse} />
                      ))}
                  </div>

                  {totalMyCourses > MY_COURSES_LIMIT && (
                    <nav className="edublink-pagination-wrapper mt-6!">
                      <ul className="page-number">
                        <li className={myCoursesPage === 1 ? "opacity-30" : ""}>
                          <a
                            className="page-numbers"
                            onClick={() =>
                              myCoursesPage !== 1 &&
                              setMyCoursesPage((p) => p - 1)
                            }
                          >
                            <span className="edublink-pagination-icon icon-west "></span>
                          </a>
                        </li>

                        {Array.from(
                          { length: totalMyCoursesPages },
                          (_, i) => i + 1,
                        ).map((p) => (
                          <li
                            key={p}
                            className={p === myCoursesPage ? "active" : ""}
                          >
                            <a
                              className={`page-numbers ${p === myCoursesPage ? "current" : ""}`}
                              onClick={() => setMyCoursesPage(p)}
                            >
                              {p}
                            </a>
                          </li>
                        ))}

                        <li
                          className={
                            myCoursesPage === totalMyCoursesPages
                              ? "opacity-30!"
                              : ""
                          }
                        >
                          <a
                            className="page-numbers"
                            title="next"
                            onClick={() =>
                              myCoursesPage !== totalMyCoursesPages &&
                              setMyCoursesPage((p) => p + 1)
                            }
                          >
                            <span className="edublink-pagination-icon icon-east"></span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                  <hr className="my-10!" />
                </div>
              )}

              {/* ALL COURSES SECTION */}
              {
                Courses?.length > 0 ? (
                  <>
                    <div className="edublink-course-archive-top-bar-wrapper">
                      <div className="edublink-course-archive-top-bar edublink-row">
                        <div className="edublink-col-md-6">
                          <h3 className="mb-4! text-2xl font-bold!">All Courses</h3>
                          <span className="edublink-course-archive-index-count">
                            Showing{" "}
                            <span>
                              {start}-{end}
                            </span>{" "}
                            Of <span>{totalData}</span> Results
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! ">
                      {Courses?.map((course) => (
                        <CourseCard key={course._id} course={course} />
                      ))}
                    </div>

                    {totalData > LIMIT && (
                      <nav className="edublink-pagination-wrapper">
                        <ul className="page-number">
                          <li className={page === 1 ? "opacity-30" : ""}>
                            <a
                              className="page-numbers"
                              onClick={() => page !== 1 && setPage((p) => p - 1)}
                            >
                              {/* ‹ */}
                              <span className="edublink-pagination-icon icon-west "></span>
                            </a>
                          </li>

                          {/* PAGE NUMBERS */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (p) => (
                              <li key={p} className={p === page ? "active" : ""}>
                                <a
                                  className={`page-numbers ${p === page ? "current" : ""}`}
                                  onClick={() => setPage(p)}
                                >
                                  {p}
                                </a>
                              </li>
                            ),
                          )}

                          <li className={page === totalPages ? "opacity-30!" : ""}>
                            <a
                              className="page-numbers"
                              title="next"
                              onClick={() =>
                                page !== totalPages && setPage((p) => p + 1)
                              }
                            >
                              <span className="edublink-pagination-icon icon-east"></span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </>
                ) : <NoData />
              }


            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Course;
