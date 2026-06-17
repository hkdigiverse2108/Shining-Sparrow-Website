import { Link } from "react-router-dom";
import { ContactDetails, FooterContactText, HK_DigiVerse_Link, QuickLinks, SupportPolicy } from "../Data";
import { Mutation } from "../Api";
import { useAppSelector } from "../Store/Hook";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "../Components/FormFields";
import { AntdNotification } from "../Utils/AntNotification";
import { notification } from "antd";

const Footer = () => {
  const AllSettings = useAppSelector((state) => state.settings.settings);
  const { facebook, instagram, linkedin, twitter } = AllSettings?.socialMediaLinks || {};

  const { mutate: useAddNewsLetterMutate } = Mutation.useAddNewsLetter();

  const socialIcons = [
    {
      name: "facebook",
      link: facebook,
      iconClass: "icon-facebook",
      wrapperClass: "elementor-social-icon-icon-facebook elementor-repeater-item-14da801",
    },
    {
      name: "linkedin2",
      link: linkedin,
      iconClass: "icon-linkedin2",
      wrapperClass: "elementor-social-icon-icon-linkedin2 elementor-repeater-item-50f33d0",
    },
    {
      name: "instagram",
      link: instagram,
      iconClass: "icon-instagram",
      wrapperClass: "elementor-social-icon-icon-instagram elementor-repeater-item-ed7a4ad",
    },
    {
      name: "twitter",
      link: twitter,
      iconClass: "icon-twitter",
      wrapperClass: "elementor-social-icon-icon-twitter elementor-repeater-item-83e3472",
    },
    // {
    //   name: "youtube",
    //   link : ,
    //   iconClass: "icon-youtube",
    //   wrapperClass:
    //     "elementor-social-icon-icon-youtube elementor-repeater-item-5779254",
    // },
  ];

  return (
    <footer id="edublink-footer" className="edublink-footer footer-builder-wrapper footer-common">
      <div className="edublink-footer-inner">
        <div className="elementor elementor-13627">
          <section className="elementor-section elementor-top-section elementor-element elementor-element-d21d741 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="d21d741" data-element_type="section" data-settings='{"background_background":"classic"}'>
            <div className="elementor-background-overlay" />
            <div className="elementor-container elementor-column-gap-extended">
              <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-cb78022" data-id="cb78022" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-b167e35 elementor-widget elementor-widget-edublink-site-logo" data-id="b167e35" data-element_type="widget" data-widget_type="edublink-site-logo.default">
                    <div className="elementor-widget-container">
                      <div className="edublink-site-logo-widget-container">
                        <span className="edublink-site-main-logo edublink-site-main-logo-type">
                          <Link to="" data-elementor-open-lightbox className="elementor-clickable">
                            <img alt="logo-white" src={AllSettings?.logo} />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="elementor-element elementor-element-eacdb72 elementor-widget elementor-widget-text-editor" data-id="eacdb72" data-element_type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container">
                      <p>{FooterAboutText}</p>
                    </div>
                  </div> */}
                  <div className="elementor-element elementor-element-68c25a6 elementor-widget elementor-widget-text-editor" data-id="68c25a6" data-element_type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container">
                      <p>
                        <span className="edublink-p-medium">Address:</span> {ContactDetails?.Address}
                        <br />
                        <span className="edublink-p-medium">Call:</span>
                        <Link to={`tel:${ContactDetails?.Number}`} className="edublink-color-off-white">
                          {ContactDetails?.Number}
                        </Link>
                        <br />
                        <span className="edublink-p-medium">Email:</span>
                        <Link to={`mailto:${ContactDetails?.EmailInfo}`} className="edublink-color-off-white">
                          {ContactDetails?.EmailInfo}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-19ecb93" data-id="19ecb93" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-48938a7 elementor-widget elementor-widget-heading" data-id="48938a7" data-element_type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">Quick Links</h4>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-4f66943 elementor-widget elementor-widget-edublink-footer-menu" data-id="4f66943" data-element_type="widget" data-widget_type="edublink-footer-menu.default">
                    <div className="elementor-widget-container">
                      <nav className="edublink-nav-menu-wrapper">
                        <ul id="menu-1-4f66943" className="footer-navigation-menu">
                          {QuickLinks.map((item, index) => (
                            <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page nav-item menu-item-16553 menu-align-left">
                              <Link to={item?.link || ""} className="nav-link">
                                {item?.Title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-67ce78c" data-id="67ce78c" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-9cafb16 elementor-widget elementor-widget-heading" data-id="9cafb16" data-element_type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">Support</h4>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-5cc6a14 elementor-widget elementor-widget-edublink-footer-menu" data-id="5cc6a14" data-element_type="widget" data-widget_type="edublink-footer-menu.default">
                    <div className="elementor-widget-container">
                      <nav className="edublink-nav-menu-wrapper">
                        <ul id="menu-1-5cc6a14" className="footer-navigation-menu">
                          {SupportPolicy.map((item, index) => (
                            <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page nav-item menu-item-17401 menu-align-left">
                              <Link to={item?.link || ""} className="nav-link">
                                {item?.Title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-1b5af9b" data-id="1b5af9b" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-1d6c34b elementor-widget elementor-widget-heading" data-id="1d6c34b" data-element_type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">Contacts</h4>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-ae82895 elementor-widget elementor-widget-text-editor" data-id="ae82895" data-element_type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container">
                      <p>{FooterContactText}</p>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-54f833c elementor-widget elementor-widget-edublink-mailchimp" data-id="54f833c" data-element_type="widget" data-widget_type="edublink-mailchimp.default">
                    <div className="elementor-widget-container">
                      <div className="edublink-mailchimp-wrapper edublink-mailchimp-horizontal-type edublink-mailchimp-mobile-yes">
                        <Formik
                          initialValues={{ email: "" }}
                          validationSchema={Yup.object({
                            email: Yup.string().email("Invalid email").required("Required"),
                          })}
                          onSubmit={(values, { resetForm }) => {
                            useAddNewsLetterMutate(values, {
                              onSuccess: () => {
                                AntdNotification(notification, "success", "Subscribed successfully!");
                                resetForm();
                              },
                              onError: (error: any) => {
                                AntdNotification(
                                  notification,
                                  "error",
                                  error?.message || "Subscription failed."
                                );
                              },
                            });
                          }}
                        >
                          {() => (
                            <Form>
                              <div className="edublink-mailchimp-form-container">
                                <div className="edublink-mailchimp-item edublink-mailchimp-email">
                                  <FormInput
                                    name="email"
                                    type="email"
                                    className="edublink-mailchimp-input-field"
                                    placeholder="Your email"
                                    containerClassName="m-0"
                                    errorClassName="text-red-500 text-[10px] mt-1 block absolute"
                                  />
                                </div>
                                <div className="edublink-mailchimp-submit-btn">
                                  <button type="submit" className="edublink-mailchimp-subscribe-btn edublink-button-item edublink-button-type-fill style-1 b-default">
                                    <span className="edublink-mailchimp-subscribe-btn-text">Subscribe</span>
                                    <span className="edublink-mailchimp-subscribe-btn-icon">
                                      <i aria-hidden="true" className="edublink icon-4" />
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-a258bcb elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-id="a258bcb" data-element_type="widget" data-widget_type="social-icons.default">
                    <div className="elementor-widget-container">
                      <style
                        dangerouslySetInnerHTML={{
                          __html: "/*! elementor - v3.17.0 - 25-10-2023 */\n.elementor-widget-social-icons.elementor-grid-0 .elementor-widget-container,.elementor-widget-social-icons.elementor-grid-mobile-0 .elementor-widget-container,.elementor-widget-social-icons.elementor-grid-tablet-0 .elementor-widget-container{line-height:1;font-size:0}.elementor-widget-social-icons:not(.elementor-grid-0):not(.elementor-grid-tablet-0):not(.elementor-grid-mobile-0) .elementor-grid{display:inline-grid}.elementor-widget-social-icons .elementor-grid{grid-column-gap:var(--grid-column-gap,5px);grid-row-gap:var(--grid-row-gap,5px);grid-template-columns:var(--grid-template-columns);justify-content:var(--justify-content,center);justify-items:var(--justify-content,center)}.elementor-icon.elementor-social-icon{font-size:var(--icon-size,25px);line-height:var(--icon-size,25px);width:calc(var(--icon-size, 25px) + (2 * var(--icon-padding, .5em)));height:calc(var(--icon-size, 25px) + (2 * var(--icon-padding, .5em)))}.elementor-social-icon{--e-social-icon-icon-color:#fff;display:inline-flex;background-color:#69727d;align-items:center;justify-content:center;text-align:center;cursor:pointer}.elementor-social-icon i{color:var(--e-social-icon-icon-color)}.elementor-social-icon svg{fill:var(--e-social-icon-icon-color)}.elementor-social-icon:last-child{margin:0}.elementor-social-icon:hover{opacity:.9;color:#fff}.elementor-social-icon-android{background-color:#a4c639}.elementor-social-icon-apple{background-color:#999}.elementor-social-icon-behance{background-color:#1769ff}.elementor-social-icon-bitbucket{background-color:#205081}.elementor-social-icon-codepen{background-color:#000}.elementor-social-icon-delicious{background-color:#39f}.elementor-social-icon-deviantart{background-color:#05cc47}.elementor-social-icon-digg{background-color:#005be2}.elementor-social-icon-dribbble{background-color:#ea4c89}.elementor-social-icon-elementor{background-color:#d30c5c}.elementor-social-icon-envelope{background-color:#ea4335}.elementor-social-icon-facebook,.elementor-social-icon-facebook-f{background-color:#3b5998}.elementor-social-icon-flickr{background-color:#0063dc}.elementor-social-icon-foursquare{background-color:#2d5be3}.elementor-social-icon-free-code-camp,.elementor-social-icon-freecodecamp{background-color:#006400}.elementor-social-icon-github{background-color:#333}.elementor-social-icon-gitlab{background-color:#e24329}.elementor-social-icon-globe{background-color:#69727d}.elementor-social-icon-google-plus,.elementor-social-icon-google-plus-g{background-color:#dd4b39}.elementor-social-icon-houzz{background-color:#7ac142}.elementor-social-icon-instagram{background-color:#262626}.elementor-social-icon-jsfiddle{background-color:#487aa2}.elementor-social-icon-link{background-color:#818a91}.elementor-social-icon-linkedin,.elementor-social-icon-linkedin-in{background-color:#0077b5}.elementor-social-icon-medium{background-color:#00ab6b}.elementor-social-icon-meetup{background-color:#ec1c40}.elementor-social-icon-mixcloud{background-color:#273a4b}.elementor-social-icon-odnoklassniki{background-color:#f4731c}.elementor-social-icon-pinterest{background-color:#bd081c}.elementor-social-icon-product-hunt{background-color:#da552f}.elementor-social-icon-reddit{background-color:#ff4500}.elementor-social-icon-rss{background-color:#f26522}.elementor-social-icon-shopping-cart{background-color:#4caf50}.elementor-social-icon-skype{background-color:#00aff0}.elementor-social-icon-slideshare{background-color:#0077b5}.elementor-social-icon-snapchat{background-color:#fffc00}.elementor-social-icon-soundcloud{background-color:#f80}.elementor-social-icon-spotify{background-color:#2ebd59}.elementor-social-icon-stack-overflow{background-color:#fe7a15}.elementor-social-icon-steam{background-color:#00adee}.elementor-social-icon-stumbleupon{background-color:#eb4924}.elementor-social-icon-telegram{background-color:#2ca5e0}.elementor-social-icon-thumb-tack{background-color:#1aa1d8}.elementor-social-icon-tripadvisor{background-color:#589442}.elementor-social-icon-tumblr{background-color:#35465c}.elementor-social-icon-twitch{background-color:#6441a5}.elementor-social-icon-twitter{background-color:#1da1f2}.elementor-social-icon-viber{background-color:#665cac}.elementor-social-icon-vimeo{background-color:#1ab7ea}.elementor-social-icon-vk{background-color:#45668e}.elementor-social-icon-weibo{background-color:#dd2430}.elementor-social-icon-weixin{background-color:#31a918}.elementor-social-icon-whatsapp{background-color:#25d366}.elementor-social-icon-wordpress{background-color:#21759b}.elementor-social-icon-xing{background-color:#026466}.elementor-social-icon-yelp{background-color:#af0606}.elementor-social-icon-youtube{background-color:#cd201f}.elementor-social-icon-500px{background-color:#0099e5}.elementor-shape-rounded .elementor-icon.elementor-social-icon{border-radius:10%}.elementor-shape-circle .elementor-icon.elementor-social-icon{border-radius:50%}",
                        }}
                      />
                      <div className="elementor-social-icons-wrapper elementor-grid">
                        {socialIcons.map((item, index) => (
                          <span className="elementor-grid-item" key={index}>
                            <Link to={item?.link || ""} className={`elementor-icon elementor-social-icon ${item.wrapperClass}`} target="_blank">
                              <span className="elementor-screen-only">Icon-{item.name}</span>
                              <i className={`edublink ${item.iconClass}`} />
                            </Link>
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* <div className="elementor-widget-container">
                      <div className="elementor-social-icons-wrapper elementor-grid space-x-3! ps-3!">
                        {SocialMediaLinks.map((item, index) => {
                          const Icon = item?.icon;

                          return (
                            <span key={index} className="elementor-grid-item">
                              <Link to={item?.link} className="elementor-icon elementor-social-icon elementor-social-icon-icon-facebook elementor-repeater-item-14da801" target="_blank">
                                <span className="elementor-screen-only">{item?.title}</span>
                                <span>
                                  <Icon className="text-4xl!" />
                                </span>
                              </Link>
                            </span>
                          );
                        })}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="elementor-section elementor-top-section elementor-element elementor-element-8f6bdcb elementor-section-boxed elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-extended">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-732c287" data-id="732c287" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-dcc37e4 elementor-widget elementor-widget-edublink-footer-copyright" data-id="dcc37e4" data-element_type="widget" data-widget_type="edublink-footer-copyright.default">
                    <div className="elementor-widget-container">
                      <div className="edublink-copyright-wrapper">
                        <span>
                          © 2025 HK DigiSkill. All Rights Reserved. Designed & maintained by
                          <Link to={HK_DigiVerse_Link} target="_blank"> HK DigiVerse LLP</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
