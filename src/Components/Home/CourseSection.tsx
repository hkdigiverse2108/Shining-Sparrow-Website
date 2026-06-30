import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { Course } from "../../Types";
import { ImagePath } from "../../Constants";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────
   Desktop: Horizontal Hover Accordion Card
───────────────────────────────────────────────── */
const AccordionCourseCard = ({
  course, isActive, isCollapsed, onHover, onLeave,
}: {
  course: Course;
  isActive: boolean;
  isCollapsed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const {
    _id,
    language,
    image = `${ImagePath}/course/course-01/course-01.jpg`,
    name,
    description,
  } = course;

  return (
    <Link
      to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        flex: isActive ? "3.5" : isCollapsed ? "0.6" : "1",
        transition: "flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        minWidth: 0,
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        display: "block",
        height: "400px",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isActive ? "scale(1.06)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.45) 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Language Badge */}
      <div
        style={{
          position: "absolute", top: "14px", left: "14px",
          background: "rgba(181,122,63,0.92)", color: "#fff",
          fontSize: "11px", fontWeight: 700, padding: "4px 10px",
          borderRadius: "20px", letterSpacing: "0.5px",
          display: "flex", alignItems: "center", gap: "5px",
          backdropFilter: "blur(4px)", whiteSpace: "nowrap",
          opacity: isCollapsed ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <i className="icon-61" style={{ fontSize: "10px" }} />
        {language}
      </div>

      {/* Normal: Horizontal Title */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 16px",
          opacity: !isActive && !isCollapsed ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700, textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,0.6)", lineHeight: 1.4 }}>
          {name}
        </span>
      </div>

      {/* Collapsed: Vertical Title */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: isCollapsed ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "#fff", fontSize: "13px", fontWeight: 700,
            writingMode: "vertical-rl", textOrientation: "mixed",
            transform: "rotate(180deg)", letterSpacing: "2px",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            maxHeight: "280px",
          }}
        >
          {name}
        </span>
      </div>

      {/* Active: Bottom Content */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "28px 24px",
          transform: isActive ? "translateY(0)" : "translateY(20px)",
          opacity: isActive ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
          pointerEvents: "none",
        }}
      >
        <h5 style={{ color: "#fff", margin: "0 0 10px 0", fontSize: "20px", fontWeight: 800, lineHeight: 1.3, textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
          {name}
        </h5>
        {description && (
          <p style={{ color: "rgba(255,255,255,0.82)", margin: "0 0 18px 0", fontSize: "13px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {description.replace(/<[^>]*>/g, "")}
          </p>
        )}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f97316", color: "#fff", padding: "8px 18px", borderRadius: "30px", fontSize: "13px", fontWeight: 700, boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}>
          Enroll Now <i className="icon-4" />
        </span>
      </div>

      {/* Glow Border */}
      <div
        style={{
          position: "absolute", inset: 0, borderRadius: "20px",
          boxShadow: isActive ? "inset 0 0 0 2px rgba(249,115,22,0.6)" : "none",
          transition: "box-shadow 0.4s ease", pointerEvents: "none",
        }}
      />
    </Link>
  );
};

/* ─────────────────────────────────────────────────
   Mobile: Vertical Tap-to-Expand Card
───────────────────────────────────────────────── */
const MobileCourseCard = ({
  course, isOpen, onToggle,
}: {
  course: Course;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const {
    _id,
    language,
    image = `${ImagePath}/course/course-01/course-01.jpg`,
    name,
    description,
  } = course;

  return (
    <div
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: isOpen ? "0 8px 32px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.3s ease",
        background: "#fff",
        marginBottom: "0",
      }}
    >
      {/* Card Header (always visible) - tap to expand */}
      <div
        onClick={onToggle}
        style={{
          position: "relative",
          height: isOpen ? "280px" : "140px",
          transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: isOpen ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.25) 70%, transparent 100%)",
          }}
        />

        {/* Language badge */}
        <div
          style={{
            position: "absolute", top: "10px", left: "12px",
            background: "rgba(181,122,63,0.92)", color: "#fff",
            fontSize: "10px", fontWeight: 700, padding: "3px 8px",
            borderRadius: "20px", display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          <i className="icon-61" style={{ fontSize: "9px" }} />
          {language}
        </div>

        {/* Title always visible at bottom of header */}
        <div
          style={{
            position: "absolute", bottom: "12px", left: "14px", right: "20px",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px", textShadow: "0 2px 6px rgba(0,0,0,0.5)", lineHeight: 1.3 }}>
            {name}
          </span>
        </div>
      </div>

      {/* Expandable content */}
      <div
        style={{
          maxHeight: isOpen ? "280px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ padding: "16px 16px 18px" }}>
          {description && (
            <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.65, margin: "0 0 14px 0", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {description.replace(/<[^>]*>/g, "")}
            </p>
          )}
          <Link
            to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#f97316", color: "#fff",
              padding: "9px 20px", borderRadius: "30px",
              fontSize: "13px", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(249,115,22,0.3)",
            }}
          >
            Enroll Now <i className="icon-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────── */
const CourseSection = ({ courses, isLoading = false }: { courses?: Course[]; isLoading?: boolean }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredCourses = (courses || [])
    .filter((course) => course.priority !== undefined && course.priority >= 1 && course.priority <= 4)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .slice(0, 4);

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-e0cd102 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
      <div className="elementor-background-overlay" />
      <div className="elementor-container elementor-column-gap-extended">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-cd4cbd1"
          data-id="cd4cbd1"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-b2d71ca elementor-widget elementor-widget-edublink-heading"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              <div className="elementor-widget-container">
                <div className="edublink-section-heading">
                  <span className="pre-heading">POPULAR COURSES</span>
                  <h3 className="heading">Pick A Course To Get Started</h3>
                  <div className="title-shape">
                    <i className="icon-19" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Loading Skeleton ── */}
            {isLoading ? (
              isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse" style={{ height: "140px", borderRadius: "18px", background: "#e2e8f0" }} />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", gap: "12px", width: "100%", height: "400px", alignItems: "stretch" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse" style={{ flex: 1, borderRadius: "20px", background: "#e2e8f0" }} />
                  ))}
                </div>
              )
            ) : (
              <>
                {/* ── Desktop: Horizontal Hover Accordion ── */}
                {!isMobile && (
                  <div
                    data-aos="fade-up"
                    data-aos-duration={1200}
                    style={{ display: "flex", gap: "12px", width: "100%", height: "400px", alignItems: "stretch" }}
                  >
                    {filteredCourses.map((course, index) => (
                      <AccordionCourseCard
                        key={course._id}
                        course={course}
                        isActive={activeIndex === index}
                        isCollapsed={activeIndex !== null && activeIndex !== index}
                        onHover={() => setActiveIndex(index)}
                        onLeave={() => setActiveIndex(null)}
                      />
                    ))}
                  </div>
                )}

                {/* ── Mobile: Vertical Tap-to-Expand ── */}
                {isMobile && (
                  <div
                    data-aos="fade-up"
                    data-aos-duration={1200}
                    style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}
                  >
                    {filteredCourses.map((course, index) => (
                      <MobileCourseCard
                        key={course._id}
                        course={course}
                        isOpen={openMobileIndex === index}
                        onToggle={() =>
                          setOpenMobileIndex(openMobileIndex === index ? null : index)
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            <div
              className="elementor-element elementor-element-555c286 elementor-widget elementor-widget-edublink-button"
              data-id="555c286"
              data-element_type="widget"
              data-widget_type="edublink-button.default"
            >
              <div className="elementor-widget-container">
                <div className="edublink-button-widget-wrapper">
                  <Link
                    className="edublink-button-item edublink-button-style-default edublink-button-size-custom edublink-button-icon-position-after default-style"
                    to={ROUTES.COURSE.BASE}
                  >
                    Browse more courses
                    <i className="icon-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
