import { BreadCrumb } from "../../Components/Common";
import { ImagePath } from "../../Constants";
import { MouseParallax } from "../../CoreComponents";
import { ContactDetails } from "../../Data";
import { Link } from "react-router-dom";
import { Mutation } from "../../Api";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";
import { useAppSelector } from "../../Store/Hook";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormTextArea } from "../../Components/FormFields";

const Contact = () => {
  const AllSettings = useAppSelector((state) => state.settings.settings);
  const { facebook = "", instagram = "", linkedin = "", twitter = "" } = AllSettings?.socialMediaLinks || {};

  const { mutate: addContact, isPending } = Mutation.useAddContact();

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
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
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    addContact(values, {
      onSuccess: () => {
        AntdNotification(notification, "success", "Message sent successfully!");
        resetForm();
      },
      onError: () => {
        AntdNotification(notification, "error", "Failed to send message. Please try again.");
      },
    });
  };

  return (
    <div>
      <section>
        <BreadCrumb title="Contact Us" />
      </section>
      <section>
        <div
          data-elementor-type="wp-page"
          data-elementor-id="17213"
          className=" elementor elementor-17213"
        >
          {/* ================= SECTION 1 ================= */}
          <section
            className="mt-10! mb-30! elementor-section elementor-top-section elementor-element elementor-element-7ed12df elementor-section-boxed elementor-section-height-default elementor-section-height-default"
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

                  {/* Address */}
                  <div
                    className="space-y-3! mt-6! elementor-element elementor-element-614944a elementor-widget-heading"
                    data-id="614944a"
                    data-element_type="widget"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Address
                      </h5>
                    </div>

                    <p>
                      {ContactDetails?.Address}
                      {/* Studio 76d, Riley Ford, North Michael chester,
                      <br /> CF99 6QQ */}
                    </p>
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
                        Email
                      </h5>
                    </div>

                    <p>
                      <Link to={`mailto:${ContactDetails?.EmailSales}`}>
                        {/* edublink@example.com */}
                        {ContactDetails?.EmailSales}
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
                        Phone
                      </h5>
                    </div>

                    <p>
                      <Link to={`tel:${ContactDetails?.Number}`}>
                        {/* (+091) 413 554 8598 */}
                        {ContactDetails?.Number}
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
                      className=" bg-white! p-25! -mb-70! shadow-2xl! z-10! rounded-lg! elementor-element elementor-element-5690efc e-con-full e-flex e-con e-child"
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
                            Get In Touch
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
                            Fill out this form for booking a consultant advising
                            session.
                          </p>
                        </div>
                      </div>

                      {/* CONTACT FORM (STATIC) */}
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
                                      name="subject"
                                      placeholder="Subject *"
                                      type="text"
                                    />

                                    <FormTextArea
                                      name="message"
                                      placeholder="Your Message *"
                                    />

                                    {/* Submit */}
                                    <div className="edublink-contact-form-single-item eb-contact-button">
                                      <div className="eb-contact-button-wrapper">
                                        <p>
                                          <button
                                            className="wpcf7-form-control wpcf7-submit has-spinner edublink-button-with-icon  gap-2"
                                            type="submit"
                                            disabled={isPending}
                                          >
                                            {isPending ? (
                                              <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                Sending...
                                              </>
                                            ) : (
                                              "Submit Message"
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
                            {/* FORM END */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End FORM SECTION */}
                  </div>
                </MouseParallax>
              </div>
            </div>
          </section>

          {/* ================= MAP SECTION ================= */}
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-a7d265d elementor-section-full_width elementor-section-height-default elementor-section-height-default"
            data-id="a7d265d"
            data-element_type="section"
          >
            <div className="elementor-container elementor-column-gap-no">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-102888e"
                data-id="102888e"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div
                    className="elementor-element elementor-element-3ac55f1 elementor-widget elementor-widget-google_maps"
                    data-id="3ac55f1"
                    data-element_type="widget"
                    data-widget_type="google_maps.default"
                  >
                    <div className="elementor-widget-container">
                      <div className="elementor-custom-embed">
                        {/* <iframe
                          loading="lazy"
                          src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=10&output=embed&iwloc=near"
                          title="London Eye, London, United Kingdom"
                          aria-label="London Eye, London, United Kingdom"
                          style={{
                            height: "600px",
                            width: "100%",
                            border: "0",
                          }}
                        /> */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9378723872605!2d72.8687078753715!3d21.234312080466818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x23edd1e9a5188c01%3A0xf02c11f43f5a7caa!2sHK%20DigiVerse%20LLP!5e0!3m2!1sen!2sin!4v1769517970618!5m2!1sen!2sin"
                          width="600"
                          height="450"
                          // style="border:0;"
                          // allowfullscreen=""
                          loading="lazy"
                        // referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Contact;
