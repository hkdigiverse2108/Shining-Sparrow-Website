import { type FC } from "react";

const CourseOverviewSection: FC<{ desc?: string; title?: string }> = ({
  desc = "",
  title = "Course Description",
}) => {
  return (
    <div
      className="course-tab-panel-overview course-tab-panel"
      id="tab-overview"
    >
      <div className="course-description" id="learn-press-course-description">
        <h3>{title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: desc || "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CourseOverviewSection;
