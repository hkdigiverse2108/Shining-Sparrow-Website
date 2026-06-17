import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalVideoLink } from "../../Store/Slices/VideoModalSlice";
import { Queries } from "../../Api";
import type { CourseLesson } from "../../Types";
import { Skeleton } from "antd";
import NoData from "../Common/NoData";

interface CourseCurriculumSectionProps {
  lessons?: CourseLesson[];
  index?: number;
}

const CourseLessonItem = ({
  lesson,
  index,
  isUnlocked,
}: {
  lesson: CourseLesson;
  index?: number;
  isUnlocked?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  const dispatch = useDispatch();

  // Fetch curriculum only when the item is expanded
  const { data: curriculumData, isLoading } = Queries.useGetCurriculumByLesson(
    lesson._id,
    { enabled: isOpen },
  );

  const curriculums = curriculumData?.data?.course_curriculum_data || [];

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li
        className={`section ${!isOpen ? "closed" : ""} ${index !== 0 ? "mt-12!" : ""} ps-9! pe-12! pt-9! pb-6!  `}
        id="section-basic-introduction-3"
        data-id="basic-introduction-3"
        data-section-id="3"
      >
        <div
          className="section-header  "
          onClick={toggleSection}
          style={{ cursor: "pointer" }}
        >
          <div className="section-left">
            <h5 className="section-title">{lesson?.title}</h5>
            <span className="section-toggle">
              <i className={`fas fa-caret-${isOpen ? "up" : "down"}`}></i>
            </span>
          </div>
        </div>

        <ul className="section-content">
          {isLoading ? (
            <li className="course-item" style={{}}>
              <Skeleton.Node active={true} style={{ width: "100%", height: 40 }} />
            </li>
          ) : curriculums.length > 0 ? (
            curriculums.map((curriculum) => {
              const isActuallyLocked = !isUnlocked && curriculum.curriculumLock;
              return (
                <li
                  className={`course-item course-item-lp_lesson course-item-12783 ${isActuallyLocked ? "item-locked" : "item-preview has-status"}`}
                  key={curriculum._id}
                >
                  <div
                    className="section-item-link before:content-none!"
                    style={{
                      cursor: isActuallyLocked
                        ? "not-allowed"
                        : "pointer",
                    }}
                    onClick={() => {
                      if (!isActuallyLocked) {
                        dispatch(setModalVideoLink(curriculum.videoLink));
                      }
                    }}
                  >
                    <img
                      src={curriculum.thumbnail}
                      alt={curriculum.title}
                      className="w-20 me-2! rounded-lg!"
                    />
                    <span className="item-name"> {curriculum.title}</span>
                    <div className="course-item-meta">
                      {isActuallyLocked && (
                        <>
                          <span className="item-meta duration">
                            {curriculum.duration}
                          </span>
                        </>
                      )}

                      <span
                        className={
                          isActuallyLocked
                            ? "item-meta course-item-status"
                            : "item-meta course-item-preview"
                        }
                        data-preview={
                          isActuallyLocked ? "Unread" : "Preview"
                        }
                      ></span>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="course-item" >
              <NoData />
            </li>
          )}
        </ul>
      </li>
    </>
  );
};

const CourseCurriculumSection = ({
  lessons = [],
  isUnlocked = false,
}: CourseCurriculumSectionProps & { isUnlocked?: boolean }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <div
        className="course-tab-panel-curriculum course-tab-panel"
        id="tab-curriculum"
      >
        <div className="course-curriculum" id="learn-press-course-curriculum">
          <NoData />
        </div>
      </div>
    );
  }

  return (
    <div
      className="course-tab-panel-curriculum course-tab-panel"
      id="tab-curriculum"
    >
      <div className="course-curriculum" id="learn-press-course-curriculum">
        <div className="curriculum-scrollable">
          <ul className="curriculum-sections">
            {lessons.map((lesson, index) => (
              <CourseLessonItem
                key={lesson._id}
                lesson={lesson}
                index={index}
                isUnlocked={isUnlocked}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculumSection;
