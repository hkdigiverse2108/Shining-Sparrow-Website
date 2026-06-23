import type { FC } from "react";

const FaqCard: FC<{
  question: string | Record<string, string>;
  answer: string | Record<string, string>;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => {
  const getVal = (val: any) => {
    if (!val) return "";
    if (typeof val === "object") {
      return val.en || val.hi || val.gu || "";
    }
    return val;
  };

  const displayQuestion = getVal(question);
  const displayAnswer = getVal(answer);

  return (
    <div
      className={`eb-accordion-item elementor-repeater-item-2add476 ${
        isOpen ? "active default-active" : ""
      }`}
      onClick={onClick}
    >
      <h5
        className={`eb-accordion-header default-active ${
          isOpen ? "active" : ""
        }`}
      >
        {displayQuestion}
      </h5>

      <div
        className="eb-accordion-content"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="eb-accordion-body default-active">
          <p>{displayAnswer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
