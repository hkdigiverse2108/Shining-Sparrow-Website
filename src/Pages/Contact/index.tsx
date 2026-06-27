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

const Contact = () => {
  const { mutate: addContact, isPending } = Mutation.useAddContact();
  
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
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Your Name"),
    email: Yup.string().email("Invalid email").required("Please Enter Your Email Address"),
    phoneNumber: Yup.string().required("Please Enter Your Phone Number"),
    subject: Yup.string().required("Please Enter Subject"),
    message: Yup.string().required("Please Enter Message"),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    addContact(values, {
      onSuccess: () => {
        AntdNotification(notification, "success", "Message Sent Successfully");
        resetForm();
      },
    });
  };

  return (
    <div id="edublink-content">
      <div className="edublink-content-inner">
        <div data-elementor-type="wp-page" data-elementor-id={13488} className="elementor elementor-13488">
          <section className="elementor-section elementor-top-section elementor-element elementor-element-be743bc elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="be743bc" data-element_type="section">
            <div className="elementor-container elementor-column-gap-extended">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d31e505" data-id="d31e505" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-77884ec elementor-widget elementor-widget-edublink-breadcrumb" data-id="77884ec" data-element_type="widget" data-widget_type="edublink-breadcrumb.default">
                    <BreadCrumb title="Contact Us" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="elementor-section elementor-top-section elementor-element elementor-element-ef4cc0f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="ef4cc0f" data-element_type="section">
            <div className="elementor-container elementor-column-gap-extended">
              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d1fcda8" data-id="d1fcda8" data-element_type="column" data-settings='{"background_background":"classic"}'>
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-af75685 elementor-widget elementor-widget-heading" data-id="af75685" data-element_type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">
                        Contact Info
                      </h4>
                    </div>
                  </div>

                  {/* Headquarters */}
                  <div className="space-y-3! elementor-element elementor-element-4447477 elementor-widget-heading" data-id="4447477" data-element_type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        Headquarters
                      </h5>
                    </div>
                    <p>{address}</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-3! elementor-element elementor-element-18d270e elementor-widget-heading" data-id="18d270e" data-element_type="widget" data-widget_type="heading.default">
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
                    {emails[1] && (
                      <p>
                        <Link to={`mailto:${emails[1]}`}>
                          {emails[1]}
                        </Link>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-3! elementor-element elementor-element-aa261c0 elementor-widget-heading" data-id="aa261c0" data-element_type="widget" data-widget_type="heading.default">
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
                      className=" bg-white! p-25! lg:-mb-70! mb-0! shadow-2xl! z-10! rounded-lg! elementor-element elementor-element-5690efc e-con-full e-flex e-con e-child"
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
                                            className="wpcf7-form-control wpcf7-submit has-spinner edublink-button-with-icon  gap-2 pt-[8px]!"
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
            style={{ position: "relative", zIndex: 1 }}
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
                        <iframe
                          title="Shining Sparrow Location Map"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
