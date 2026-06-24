import { type FC } from "react";

const CourseOverviewSection: FC<{ desc?: string; title?: string }> = ({
  desc = "",
  title = "Course Description",
}) => {
  const getSafeHtml = (html: string) => {
    if (typeof window === "undefined") return html;
    const div = window.document.createElement("div");
    div.innerHTML = html;
    return div.innerHTML;
  };

  return (
    <div
      className="course-tab-panel-overview course-tab-panel"
      id="tab-overview"
    >
      <style>{`
        .course-description ul {
          list-style-type: disc !important;
          margin-left: 20px !important;
          margin-bottom: 15px !important;
          padding-left: 10px !important;
        }
        .course-description ol {
          list-style-type: decimal !important;
          margin-left: 20px !important;
          margin-bottom: 15px !important;
          padding-left: 10px !important;
        }
        .course-description li {
          display: list-item !important;
          list-style-position: outside !important;
          margin-bottom: 8px !important;
        }
        .course-description li::before {
          content: none !important;
        }
        .course-description li p {
          display: inline !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
      <div className="course-description" id="learn-press-course-description">
        <h3>{title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: getSafeHtml(desc || ""),
          }}
        ></div>
      </div>
    </div>
  );
};

export default CourseOverviewSection;
