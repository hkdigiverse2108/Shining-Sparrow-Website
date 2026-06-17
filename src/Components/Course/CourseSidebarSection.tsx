import { type FC } from "react";
import type { Course } from "../../Types";
import { ShareButtons, PaymentModal } from "../Common";
import { ImagePath, PAYMENT_STATUS } from "../../Constants";
import { useAppSelector, useAppDispatch } from "../../Store/Hook";
import { Mutation } from "../../Api";
import { setAuthModalOpen } from "../../Store/Slices/ModalSlice";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";

import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "../../Constants/Keys";

const CourseSidebarSection: FC<{ course?: Course; onPurchaseSuccess?: () => void }> = ({ course = {}, onPurchaseSuccess }) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: verifyCourse, isPending: isVerifying } =
    Mutation.useVerifyCourse();
  const { mutate: purchaseCourse, isPending: isPurchasing } =
    Mutation.usePurchaseCourse();

  const handleBuyNowBtn = () => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      return;
    }
  };

  const handlePaymentComplete = (status: any, response: any) => {
    if (status === PAYMENT_STATUS.COMPLETED) {
      verifyCourse(
        {
          payment_id: response?.razorpay_payment_id || "",
        },
        {
          onSuccess: (verifyRes) => {
            const razorPayOrderId = verifyRes?.data?.id || "";
            purchaseCourse(
              {
                courseId: course?._id || "",
                razorpayOrderId: razorPayOrderId,
                razorpayPaymentId: response?.razorpay_payment_id || "",
              },
              {
                onSuccess: (res) => {
                  AntdNotification(
                    notification,
                    "success",
                    res?.message || "Payment Successful! Course Purchased.",
                  );
                  queryClient.invalidateQueries({ queryKey: [KEYS.COURSE_ONE, course?._id] });
                  queryClient.invalidateQueries({ queryKey: [KEYS.COURSE_LESSON, course?._id] });
                  queryClient.invalidateQueries({ queryKey: [KEYS.COURSE_CURRICULUM] });
                  if (onPurchaseSuccess) onPurchaseSuccess();
                },
                onError: (err: any) => {
                  AntdNotification(
                    notification,
                    "error",
                    err?.message ||
                    "Payment successful but course activation failed. Please contact support.",
                  );
                },
              },
            );
          },
          onError: (err: any) => {
            console.error("Verification error:", err);
            AntdNotification(
              notification,
              "error",
              err?.response?.data?.message ||
              "Payment verification failed. Please contact support.",
            );
          },
        },
      );
    } else {
      AntdNotification(
        notification,
        "error",
        "Payment Failed. Please try again.",
      );
    }
  };

  // const discountPrice = (course?.mrpPrice || 0) - (course?.price || 0);

  return (
    <div className="ed-course-sidebar edublink-col-lg-4 ">
      <div className="edublink-course-details-sidebar eb-course-single-4 sidebar-enable max-w-full!">
        <div className="edublink-course-details-sidebar-inner">
          <div className="edublink-course-details-sidebar-content">
            <h4 className="widget-title">Course Includes:</h4>

            <ul className="edublink-course-meta-informations">
              <li className="edublink-course-details-features-item course-price">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-60"></i>
                  Price:
                </span>
                <span className="edublink-course-feature-item-value">
                  <div className="course-price">
                    <span className="course-item-price">
                      <span className="price  text-success!">
                        ₹{Math.round(course?.price || 0)}/
                      </span>
                      {/* <span className="origin-price">{course?.price}</span> */}
                      {/* <span className="price text-success!">
                        ₹{Math.round(discountPrice)}
                      </span> */}
                      <span className="price text-danger! line-through text-[15px] ">
                        ₹{Math.round(course?.mrpPrice || 0)}
                      </span>
                    </span>
                  </div>
                </span>
              </li>

              {/* <li className="edublink-course-details-features-item course-price">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-60"></i>
                  Discount Price:
                </span>
                <span className="edublink-course-feature-item-value">
                  <div className="course-price">
                    <span className="course-item-price">
                      <span className="price">{Math.round(discountPrice)}</span>
                    </span>
                  </div>
                </span>
              </li>

              <li className="edublink-course-details-features-item course-price">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-60"></i>
                  Latest Price:
                </span>
                <span className="edublink-course-feature-item-value">
                  <div className="course-price">
                    <span className="course-item-price">
                      <span className="price  text-success!">
                        {Math.round(course?.price || 0)}
                      </span>
                    </span>
                  </div>
                </span>
              </li> */}

              {/* <li className="edublink-course-details-features-item course-instructor">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-62"></i>Instructor:
                </span>
                <span className="edublink-course-feature-item-value">
                  Edward Norton
                </span>
              </li> */}

              <li className="edublink-course-details-features-item course-duration">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-61"></i>Duration:
                </span>
                <span className="edublink-course-feature-item-value">
                  {course?.duration || "15 weeks"}
                </span>
              </li>

              <li className="edublink-course-details-features-item course-lesson">
                <span className="edublink-course-feature-item-label">
                  <img
                    src={`${ImagePath}/icon/lesson-icon.svg`}
                    className="edublink-course-sidebar-img-icon"
                    alt=""
                  />
                  Lectures:
                </span>
                <span className="edublink-course-feature-item-value">{course?.totalLesson}</span>
              </li>

              <li className="edublink-course-details-features-item course-student">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-63"></i>Students:
                </span>
                <span className="edublink-course-feature-item-value">
                  {course?.enrolledLearners}
                </span>
              </li>

              <li className="edublink-course-details-features-item course-language">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-59"></i>Language:
                </span>
                <span className="edublink-course-feature-item-value">
                  {course?.language}
                </span>
              </li>

              <li className="edublink-course-details-features-item course-certificate">
                <span className="edublink-course-feature-item-label">
                  <i className="icon-64"></i>Certifications:
                </span>
                <span className="edublink-course-feature-item-value">Yes</span>
              </li>
            </ul>

            <div className="edublink-course-details-sidebar-buttons">
              <div className="lp-course-buttons">
                {user ? (
                  <PaymentModal
                    btnText="Buy Now"
                    isLoading={isPurchasing || isVerifying}
                    amount={Math.round(course?.price || 0)}
                    userData={{
                      name: user.fullName,
                      email: user.email,
                      contact: user.phoneNumber,
                    }}
                    onPaymentComplete={handlePaymentComplete}
                    className="lp-button button button-purchase-course"
                  />
                ) : (
                  <button
                    onClick={handleBuyNowBtn}
                    className="lp-button button button-purchase-course"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>

            <ShareButtons
              url={window.location.href}
              title={course?.name || ""}
              variant="circle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebarSection;
