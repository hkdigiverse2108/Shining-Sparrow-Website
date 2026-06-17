import { useState } from "react";
import { Queries } from "../../Api";
import FaqCard from "../Faq/FaqCard";
import NoData from "../Common/NoData";

const CourseFaqSection = ({ type = "course" }: { type?: "course" | "workshop" }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data } = Queries.useGetFaqByType({ type });

  const faqs = data?.data?.faq_data || [];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="course-tab-panel-faq course-tab-panel">
      <div className="eb-accordion-wrapper eb-accordion-style-1">
        <div className="eb-accordion-container">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <FaqCard
                key={faq._id}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))
          ) : (
            <div className="text-center">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFaqSection;
