import { useDispatch } from "react-redux";
import { setModalVideoLink } from "../../Store/Slices/VideoModalSlice";
import type { WorkshopCurriculum } from "../../Types";
import NoData from "../Common/NoData";

interface WorkshopCurriculumSectionProps {
    curriculums?: WorkshopCurriculum[];
    isUnlocked?: boolean;
}

const WorkshopCurriculumSection = ({
    curriculums = [],
    isUnlocked = false,
}: WorkshopCurriculumSectionProps) => {
    const dispatch = useDispatch();

    if (!curriculums || curriculums.length === 0) {
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
                        <li className="section ps-9! pe-12! pt-9! pb-6!">
                            <ul className="section-content">
                                {curriculums.map((curriculum) => {
                                    const isActuallyLocked = !isUnlocked;
                                    return (
                                        <li
                                            className={`course-item course-item-lp_lesson course-item-12783 ${isActuallyLocked ? "item-locked" : "item-preview has-status"}`}
                                            key={curriculum._id}
                                        >
                                            <div
                                                className="section-item-link before:content-none!"
                                                style={{
                                                    cursor: isActuallyLocked ? "not-allowed" : "pointer",
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
                                                        <span className="item-meta duration">
                                                            {curriculum.duration}
                                                        </span>
                                                    )}
                                                    <span
                                                        className={
                                                            isActuallyLocked
                                                                ? "item-meta course-item-status"
                                                                : "item-meta course-item-preview"
                                                        }
                                                        data-preview={isActuallyLocked ? "Unread" : "Preview"}
                                                    ></span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WorkshopCurriculumSection;
