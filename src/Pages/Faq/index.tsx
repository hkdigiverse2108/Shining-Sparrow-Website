import { useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FaqCard from "../../Components/Faq/FaqCard";
import GetCeritficateSection from "../../Components/Common/GetCeritficateSection";
import { Queries } from "../../Api";
import Loader from "../../Components/Common/Loader";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<any | null>(null);

  const { data, isLoading } = Queries.useGetFaq();

  const faq = data?.data?.faq_data || [];

  // Group FAQs by type
  const mappedFaqData: Record<string, { q: string; a: string }[]> = faq.reduce(
    (acc: any, item: any) => {
      const type = item.type;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push({
        q: item.question,
        a: item.answer,
      });

      return acc;
    },
    {},
  );

  // Build tabs from API types
  const categories = Object.keys(mappedFaqData).map((type) => ({
    id: type as string,
    label: type, // 👈 SHOW TYPE AS TAB NAME
  }));

  if (!activeTab && categories.length > 0) {
    setActiveTab(categories[0].id);
  }

  return (
    <>
      <Loader loading={isLoading} />

      <div id="faq">
        <section>
          <BreadCrumb title="Faq’s" />
        </section>

        <section className="">
          <div className="elementor elementor-11511">
            <section className="my-10! elementor-section elementor-section-boxed">
              <div className="elementor-container elementor-column-gap-extended">
                <div className="elementor-column elementor-col-100">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-widget elementor-widget-edublink-faq">
                      <div className="elementor-widget-container">
                        <div className="eb-faq-wrapper eb-faq-style-2">
                          <div className="edublink-row">
                            {/* LEFT SIDE */}
                            <div className="edublink-col-lg-4">
                              <div className="eb-faq-left-side">
                                <div className="edublink-section-heading">
                                  <h3 className="heading">
                                    Questions By This Category
                                  </h3>
                                </div>

                                <ul className="eb-faq-heading-wrapper">
                                  {categories.map((cat) => (
                                    <li
                                      key={cat.id}
                                      onClick={() => setActiveTab(cat.id)}
                                      className={`eb-faq-title ${activeTab === cat.id ? "active" : ""
                                        }`}
                                    >
                                      <span className="eb-faq-title-heading capitalize ">
                                        {cat.label}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="edublink-col-lg-8">
                              <div className="eb-faqs-content-wrapper">
                                {categories.map((cat) => (
                                  <div
                                    key={cat.id}
                                    className={`eb-faq-content edublink-fade ${activeTab === cat.id ? "active" : ""
                                      }`}
                                  >
                                    <section className="elementor-section elementor-section-boxed">
                                      <div className="elementor-container">
                                        <div className="elementor-column elementor-col-100">
                                          <div className="elementor-widget-wrap elementor-element-populated">
                                            <div className="elementor-widget elementor-widget-edublink-accordion w-full!">
                                              <div className="elementor-widget-container">
                                                <div className="eb-accordion header-default border-default style-default">
                                                  {mappedFaqData[cat.id]?.map(
                                                    (item, index) => (
                                                      <FaqCard
                                                        key={index}
                                                        question={item.q}
                                                        answer={item.a}
                                                        isOpen={
                                                          activeIndex === index
                                                        }
                                                        onClick={() =>
                                                          setActiveIndex(
                                                            activeIndex === index
                                                              ? -1
                                                              : index,
                                                          )
                                                        }
                                                      />
                                                    ),
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <GetCeritficateSection />
          </div>
        </section>
      </div>
    </>
  );
};

export default Faq;
