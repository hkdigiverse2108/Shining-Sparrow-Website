import { useAppSelector } from "../../Store/Hook";

const CounterSection = () => {
  const AllSettings = useAppSelector((state) => state.settings.settings);

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-ceab01c elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="ceab01c"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-extended flex justify-center">
        <div
          className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-f52833f"
          data-aos="fade-up"
          data-aos-duration={1000}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-ef72a20 elementor-widget elementor-widget-edublink-counterup"
              data-id="ef72a20"
              data-element_type="widget"
              data-widget_type="edublink-counterup.default"
            >
              <div className="elementor-widget-container">
                <div
                  className="edublink-counter-item"
                  id="edublink-counter-id-ef72a20"
                >
                  <span className="odometer" data-odometer-final="29.3" />
                  <span className="edublink-counter-suffix">
                    {AllSettings?.enrolledLearners ?? 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-417a763 elementor-widget elementor-widget-heading"
              data-id="417a763"
              data-element_type="widget"
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h6 className="elementor-heading-title elementor-size-default">
                  STUDENT ENROLLED
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div
          className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-ecaf969"
          data-aos="fade-up"
          data-aos-duration={1200}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-a68e20d elementor-widget elementor-widget-edublink-counterup"
              data-id="a68e20d"
              data-element_type="widget"
              data-widget_type="edublink-counterup.default"
            >
              <div className="elementor-widget-container">
                <div
                  className="edublink-counter-item"
                  id="edublink-counter-id-a68e20d"
                >
                  <span className="odometer" data-odometer-final="32.4" />
                  <span className="edublink-counter-suffix">
                    {AllSettings?.classCompleted ?? 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-e3e1871 elementor-widget elementor-widget-heading"
              data-id="e3e1871"
              data-element_type="widget"
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h6 className="elementor-heading-title elementor-size-default">
                  CLASS COMPLETED
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div
          className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-6a7af8f"
          data-aos="fade-up"
          data-aos-duration={1400}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-e0925c1 elementor-widget elementor-widget-edublink-counterup"
              data-id="e0925c1"
              data-element_type="widget"
              data-widget_type="edublink-counterup.default"
            >
              <div className="elementor-widget-container">
                <div
                  className="edublink-counter-item"
                  id="edublink-counter-id-e0925c1"
                >
                  <span className="odometer" data-odometer-final={100} />
                  <span className="edublink-counter-suffix">
                    {" "}
                    {AllSettings?.satisfactionRate ?? 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-d168a93 elementor-widget elementor-widget-heading"
              data-id="d168a93"
              data-element_type="widget"
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h6 className="elementor-heading-title elementor-size-default">
                  SATISFACTION RATE
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
