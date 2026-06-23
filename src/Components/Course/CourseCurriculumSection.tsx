import type { CourseLesson } from "../../Types";
import NoData from "../Common/NoData";


interface CourseCurriculumSectionProps {
  lessons?: CourseLesson[];
  index?: number;
}

const CourseLessonItem = ({
  lesson,
  index,
}: {
  lesson: CourseLesson;
  index?: number;
  isUnlocked?: boolean;
}) => {
  return (
    <li
      className={`section closed ${index !== 0 ? "mt-12!" : ""} ps-9! pe-12! pt-9! pb-9!`}
      id={`section-${lesson._id}`}
    >
      <div className="section-header">
        <div className="section-left">
          <h5 className="section-title">{lesson?.title}</h5>
        </div>
      </div>
    </li>
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
