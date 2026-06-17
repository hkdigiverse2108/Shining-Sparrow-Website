import { type FC } from "react";
import type { Workshop } from "../../Types";
import { ShareButtons, PaymentModal } from "../Common";
import { ImagePath, PAYMENT_STATUS } from "../../Constants";
import { useAppSelector, useAppDispatch } from "../../Store/Hook";
import { Mutation } from "../../Api";
import { setAuthModalOpen } from "../../Store/Slices/ModalSlice";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "../../Constants/Keys";

const WorkshopSidebarSection: FC<{ workshop: Workshop; onPurchaseSuccess?: () => void }> = ({
    workshop,
    onPurchaseSuccess,
}) => {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutate: purchaseWorkshop, isPending: isPurchasing } =
        Mutation.usePurchaseWorkshop();

    const handleBuyNowBtn = () => {
        if (!user) {
            dispatch(setAuthModalOpen(true));
            return;
        }
    };

    const handlePaymentComplete = (status: any, response: any) => {
        if (status === PAYMENT_STATUS.COMPLETED) {
            purchaseWorkshop(
                {
                    workshopId: workshop._id || "",
                    amount: workshop.price || 0,
                    paymentId: response?.razorpay_payment_id || "",
                    paymentMethod: "razorpay",
                    finalAmount: workshop.price || 0,
                },
                {
                    onSuccess: (res) => {
                        AntdNotification(
                            notification,
                            "success",
                            res?.message || "Payment Successful! Workshop Purchased.",
                        );
                        // Invalidate queries to refresh UI
                        queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_ONE, workshop._id] });
                        queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_CURRICULUM] });
                        if (onPurchaseSuccess) onPurchaseSuccess();
                    },
                    onError: (err: any) => {
                        AntdNotification(
                            notification,
                            "error",
                            err?.message || "Payment successful but workshop activation failed. Please contact support.",
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

    const discountPrice = (workshop?.mrpPrice || 0) - (workshop?.price || 0);

    return (
        <div className="ed-course-sidebar edublink-col-lg-4 ">
            <div className="edublink-course-details-sidebar eb-course-single-4 sidebar-enable max-w-full!">
                <div className="edublink-course-details-sidebar-inner">
                    <div className="edublink-course-details-sidebar-content">
                        <h4 className="widget-title">Workshop Includes:</h4>

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
                                                ₹{Math.round(workshop?.price || 0)}/
                                            </span>
                                            <span className="price text-success!">
                                                ₹{Math.round(discountPrice)}
                                            </span>
                                            <span className="price text-danger! line-through text-[15px] ">
                                                ₹{Math.round(workshop?.mrpPrice || 0)}
                                            </span>
                                        </span>
                                    </div>
                                </span>
                            </li>

                            <li className="edublink-course-details-features-item course-duration">
                                <span className="edublink-course-feature-item-label">
                                    <i className="icon-61"></i>Duration:
                                </span>
                                <span className="edublink-course-feature-item-value">
                                    {workshop?.duration || "4 hours"}
                                </span>
                            </li>

                            <li className="edublink-course-details-features-item course-lesson">
                                <span className="edublink-course-feature-item-label">
                                    <img
                                        src={`${ImagePath}/icon/lesson-icon.svg`}
                                        className="edublink-course-sidebar-img-icon"
                                        alt=""
                                    />
                                    Validity:
                                </span>
                                <span className="edublink-course-feature-item-value">{workshop?.validFor || "30 days"}</span>
                            </li>

                            <li className="edublink-course-details-features-item course-language">
                                <span className="edublink-course-feature-item-label">
                                    <i className="icon-59"></i>Language:
                                </span>
                                <span className="edublink-course-feature-item-value">
                                    {workshop?.language}
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
                                        btnText="Enroll Now"
                                        isLoading={isPurchasing}
                                        amount={Math.round(workshop?.price || 0)}
                                        userData={{
                                            name: user.fullName,
                                            email: user.email,
                                            contact: user.phoneNumber || "",
                                        }}
                                        onPaymentComplete={handlePaymentComplete}
                                        className="lp-button button button-purchase-course"
                                    />
                                ) : (
                                    <button
                                        onClick={handleBuyNowBtn}
                                        className="lp-button button button-purchase-course"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>

                        <ShareButtons
                            url={window.location.href}
                            title={workshop?.title || ""}
                            variant="circle"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopSidebarSection;
