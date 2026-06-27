import { useState, useEffect, useRef } from "react";
import { useField } from "formik";
import { BreadCrumb } from "../../Components/Common";
import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import { ContactDetails } from "../../Data";
import { Link } from "react-router-dom";
import { Mutation, Queries } from "../../Api";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormTextArea } from "../../Components/FormFields";

const BUDGET_OPTIONS = [
  { label: "Under 5 Lakhs", value: "Under 5 Lakhs" },
  { label: "5 to 10 Lakhs", value: "5 to 10 Lakhs" },
  { label: "10 to 15 Lakhs", value: "10 to 15 Lakhs" },
  { label: "15 to 20 Lakhs", value: "15 to 20 Lakhs" },
  { label: "Above 20 Lakhs", value: "Above 20 Lakhs" }
];

const OCCUPATION_OPTIONS = [
  { label: "Business Owner", value: "Business Owner" },
  { label: "Salaried Professional", value: "Salaried Professional" },
  { label: "Teacher / Educator", value: "Teacher / Educator" },
  { label: "Home Maker", value: "Home Maker" },
  { label: "Retired", value: "Retired" },
  { label: "Others", value: "Others" }
];

const FormSelect = ({
  label,
  name,
  options,
  required = false
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <div className="form-group mb-6 relative">
      {label && (
        <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: "var(--edublink-font-secondary)" }}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <div
          className={`w-full px-5 py-3.5 bg-white border rounded-lg cursor-pointer flex justify-between items-center transition-colors duration-200
            ${meta.touched && meta.error ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
            ${isOpen ? 'border-[#F26522] ring-2 ring-[#F26522]/20' : ''}
          `}
          style={{ height: "60px" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`truncate ${!selectedOption ? "text-gray-400" : "text-gray-700"}`}>
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
          <div className="flex items-center gap-2">
            {selectedOption && (
              <div 
                className="text-gray-400 hover:text-gray-600 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  helpers.setValue("");
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ width: "16px", height: "16px" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {isOpen && (
          <div
            className="absolute left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-50 mt-1"
            style={{
              maxHeight: "220px",
              overflowY: "auto",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f3f4f6",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              width: "100%"
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-5 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between
                  ${field.value === option.value ? 'bg-[#F26522]/10 text-[#F26522] font-medium' : 'text-gray-700 hover:bg-gray-50'}
                `}
                onClick={() => {
                  helpers.setValue(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
                {field.value === option.value && (
                  <svg className="w-4 h-4 text-[#F26522]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-sm mt-1 block">
            {meta.error}
          </span>
        ) : null}
      </div>
    </div>
  );
};

const Franchise = () => {
  const { mutate: addFranchiseInquiry, isPending } = Mutation.useAddFranchiseInquiry();
  
  const { data: contactUsData } = Queries.useGetContactUs();
  const contactUs = contactUsData?.data;

  const { facebook = "", instagram = "", linkedin = "", twitter = "" } = contactUs?.socialMediaLinks || {};

  const address = contactUs?.address || ContactDetails?.Address;
  const emails = contactUs?.email 
    ? contactUs.email.split(',').map((e: string) => e.trim()) 
    : [ContactDetails?.EmailSales, ContactDetails?.EmailInfo].filter(Boolean);
  const phoneNumbers = contactUs?.phoneNumbers?.length 
    ? contactUs.phoneNumbers.map((p: any) => p.number) 
    : [ContactDetails?.Number].filter(Boolean);

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    investmentBudget: "",
    occupation: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    investmentBudget: Yup.string().required("Investment budget is required"),
    occupation: Yup.string().required("Occupation is required"),
    message: Yup.string(),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    addFranchiseInquiry(values, {
      onSuccess: () => {
        AntdNotification(notification, "success", "Inquiry sent successfully!");
        resetForm();
      },
      onError: () => {
        AntdNotification(notification, "error", "Failed to send inquiry. Please try again.");
      },
    });
  };

  return (
    <div>
      <section>
        <BreadCrumb title="Franchise Opportunity" />
      </section>
      <section>
        <div
          data-elementor-type="wp-page"
          data-elementor-id="17213"
          className=" elementor elementor-17213"
        >
          {/* ================= SECTION 1 ================= */}
          <section
            style={{ position: "relative", zIndex: 10 }}
            className="mt-10! mb-10! lg:mb-40! elementor-section elementor-top-section elementor-element elementor-element-7ed12df elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="7ed12df"
            data-element_type="section"
          >
            <div className="elementor-container elementor-column-gap-extended">
              {/* COLUMN LEFT */}
              <div
                className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c8aa340"
                data-id="c8aa340"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* Heading */}
                  <div
                    className="elementor-element elementor-element-bef7517 elementor-widget elementor-widget-heading"
                    data-id="bef7517"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h3 className="elementor-heading-title elementor-size-default  space-y-5! ">
                        <p> We're Always Eager to </p>
                        <span>Hear From You! </span>
                      </h3>
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    className="space-y-3! mt-6! elementor-element elementor-element-614944a elementor-widget-heading"
                    data-id="614944a"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Why Franchise with Shining Sparrow?
                      </h5>
                    </div>
                    <p>
                      Join our growing network of educational centers and help empower the next generation with advanced learning skills. We offer comprehensive support, curriculum guidelines, and marketing materials.
                    </p>
                  </div>

                  {/* Address */}
                  <div
                    className="space-y-3! mt-6! elementor-element elementor-element-614944a elementor-widget-heading"
                    data-id="614944a"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Headquarters
                      </h5>
                    </div>
                    <p>{address}</p>
                  </div>

                  {/* Email */}
                  <div
                    className="space-y-3! elementor-element elementor-element-18d270e elementor-widget-heading"
                    data-id="18d270e"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Email Support
                      </h5>
                    </div>
                    <p>
                      <Link to={`mailto:${emails[0]}`}>
                        {emails[0]}
                      </Link>
                    </p>
                  </div>

                  {/* Phone */}
                  <div
                    className="space-y-3! elementor-element elementor-element-aa261c0 elementor-widget elementor-widget-heading"
                    data-id="aa261c0"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Contact Hotline
                      </h5>
                    </div>
                    <p>
                      <Link to={`tel:${phoneNumbers[0]}`}>
                        {phoneNumbers[0]}
                      </Link>
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div
                    className="elementor-element elementor-element-78ac899 elementor-widget elementor-widget-edublink-social-icons"
                    data-id="78ac899"
                    data-element_type="widget"
                    data-widget_type="edublink-social-icons.default"
                  >
                    <div className="elementor-widget-container">
                      <div className="edublink-social-icons-wrapper">
                        <Link
                          to={instagram}
                          className="  elementor-repeater-item-cf6a47b edublink-social-icon-each-item elementor-animation-"
                        >
                          <i
                            aria-hidden="true"
                            className="edublink icon-instagram"
                          />
                        </Link>
                        <Link
                          to={facebook}
                          className="elementor-repeater-item-01aed80 edublink-social-icon-each-item elementor-animation-"
                        >
                          <i
                            aria-hidden="true"
                            className="edublink icon-facebook"
                          />
                        </Link>
                        <Link
                          to={twitter}
                          className="elementor-repeater-item-9450a8b edublink-social-icon-each-item elementor-animation-"
                        >
                          <i
                            aria-hidden="true"
                            className="edublink icon-twitter"
                          />
                        </Link>
                        <Link
                          to={linkedin}
                          className="elementor-repeater-item-60bf3fe edublink-social-icon-each-item elementor-animation-"
                        >
                          <i
                            aria-hidden="true"
                            className="edublink icon-linkedin2"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMN RIGHT */}
              <div
                className=" elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-88dca94"
                data-id="88dca94"
                data-element_type="column"
                data-settings='{"background_background":"classic"}'
              >
                <MouseParallax>
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {/* Floating Shape 1 */}
                    <div
                      className="z-50! elementor-element elementor-element-3a53f08 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation"
                      data-id="3a53f08"
                      data-element_type="widget"
                      data-settings='{"_position":"absolute"}'
                      data-widget_type="edublink-animation.default"
                    >
                      <div className="elementor-widget-container ">
                        <div className=" z-50! edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <div
                            className="absolute! z-50!  elementor-element elementor-element-aaaf6e9 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation"
                            data-aos="zoom-in"
                            data-aos-duration={1200}
                          >
                            <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                              <span data-depth={4}>
                                <img
                                  decoding="async"
                                  src={`${ImagePath}shapes/shape-5.png`}
                                  alt="Hero-Shape-18"
                                  style={{ filter: "sepia(1) saturate(3) hue-rotate(340deg) brightness(0.4)" }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Shape 2 */}
                    <div
                      className=" flex! justify-end! w-full! absolute! edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item"
                      style={{
                        transform: "translate3d(0px,0px,0px) rotate(0.0001deg)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        position: "relative",
                        pointerEvents: "none",
                      }}
                      data-aos="zoom-in"
                      data-aos-duration={1200}
                    >
                      <div className="elementor-element elementor-element-2f22afa elementor-widget__width-auto elementor-absolute elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-edublink-animation">
                        <div className="edublink-animation-widget edublink-animation-display-type-mouse-track edublink-animation-content-type-image edublink-mouse-track-item">
                          <span data-depth={-4}>
                            <img
                              decoding="async"
                              src={`${ImagePath}shapes/shape-1.png`}
                              alt="About-Shape-2"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* FORM SECTION */}
                    <div
                      className=" bg-white! p-25! lg:mb-0! mb-0! shadow-2xl! z-10! rounded-lg! elementor-element elementor-element-5690efc e-con-full e-flex e-con e-child"
                      data-id="5690efc"
                      data-element_type="container"
                      data-settings='{"content_width":"full"}'
                    >
                      <div
                        className="elementor-element elementor-element-5a24098 elementor-widget elementor-widget-heading"
                        data-id="5a24098"
                        data-element_type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h5 className="elementor-heading-title elementor-size-default">
                            Franchise Inquiry Form
                          </h5>
                        </div>
                      </div>

                      <div
                        className="mt-3! elementor-element elementor-element-3e24b46 elementor-widget elementor-widget-text-editor"
                        data-id="3e24b46"
                        data-element_type="widget"
                        data-widget_type="text-editor.default"
                      >
                        <div className="elementor-widget-container">
                          <p>
                            Please fill out the form below to register your interest in opening a Shining Sparrow franchise.
                          </p>
                        </div>
                      </div>

                      {/* INQUIRY FORM */}
                      <div
                        className="elementor-element elementor-element-43b0ae4 elementor-widget elementor-widget-edublink-contact-form-seven"
                        data-id="43b0ae4"
                        data-element_type="widget"
                        data-widget_type="edublink-contact-form-seven.default"
                      >
                        <div className="elementor-widget-container">
                          <div className="edublink-contact-form-wrapper">
                            {/* FORM START */}
                            <Formik
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={handleSubmit}
                            >
                              {() => (
                                <Form className="wpcf7-form">
                                  <div className="edublink-contact-form-wrapper eb-contact-us-form">
                                    <FormInput
                                      name="name"
                                      placeholder="Your name *"
                                      type="text"
                                    />

                                    <FormInput
                                      name="email"
                                      placeholder="Enter your email *"
                                      type="email"
                                    />

                                    <FormInput
                                      name="phoneNumber"
                                      placeholder="Phone Number *"
                                      type="text"
                                    />

                                    <FormInput
                                      name="city"
                                      placeholder="Target City *"
                                      type="text"
                                    />

                                    <FormInput
                                      name="state"
                                      placeholder="Target State *"
                                      type="text"
                                    />

                                    <FormSelect
                                      name="occupation"
                                      label="Your Occupation *"
                                      options={OCCUPATION_OPTIONS}
                                    />

                                    <FormSelect
                                      name="investmentBudget"
                                      label="Investment Budget *"
                                      options={BUDGET_OPTIONS}
                                    />

                                    <FormTextArea
                                      name="message"
                                      placeholder="Franchise Details & Background Info *"
                                    />

                                    {/* Submit */}
                                    <div className="edublink-contact-form-single-item eb-contact-button">
                                      <div className="eb-contact-button-wrapper">
                                        <p>
                                          <button
                                            className="wpcf7-form-control wpcf7-submit has-spinner edublink-button-with-icon  gap-2 pt-[10px]!"
                                            type="submit"
                                            disabled={isPending}
                                          >
                                            {isPending ? (
                                              <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                Submitting...
                                              </>
                                            ) : (
                                              "Submit Inquiry"
                                            )}
                                          </button>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                            {/* FORM END */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseParallax>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
