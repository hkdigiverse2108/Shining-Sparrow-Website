import { type FC, useEffect, useState } from "react";
import type { Workshop } from "../../Types";
import { ShareButtons, PaymentModal } from "../Common";
import Loader from "../Common/Loader";
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
    const { isAuthModalOpen } = useAppSelector((state) => state.Modal);
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const { mutate: purchaseWorkshop, isPending: isPurchasing } =
        Mutation.usePurchaseWorkshop();

    useEffect(() => {
        localStorage.removeItem("guest_user_info");
        localStorage.removeItem("trigger_payment_id");
    }, []);

    useEffect(() => {
        if (!isAuthModalOpen && workshop?._id && localStorage.getItem("trigger_payment_id") === workshop._id) {
            localStorage.removeItem("trigger_payment_id");
            setTimeout(() => {
                const paymentBtn = document.querySelector(".trigger-payment-btn") as HTMLButtonElement;
                if (paymentBtn) {
                    paymentBtn.click();
                }
            }, 100);
        }
    }, [workshop?._id, isAuthModalOpen]);

    const handlePaymentComplete = (status: any, response: any) => {
        if (status === PAYMENT_STATUS.COMPLETED) {
            setIsProcessingPayment(true);
            const paymentId = response?.razorpay_payment_id || "";
            const baseLoginUrl = import.meta.env.VITE_LOGIN_URL || "https://student.shiningsparrow.com";

            if (!user) {
                localStorage.removeItem("guest_user_info");
                window.location.href = `${baseLoginUrl}/login?payment_id=${paymentId}&workshop_id=${workshop?._id}`;
                return;
            }

            // Handle free coupon purchases
            if (paymentId.startsWith("FREE_COUPON_")) {
                purchaseWorkshop(
                    {
                        workshopId: workshop._id || "",
                        amount: workshop.price || 0,
                        paymentId: paymentId,
                        paymentMethod: "coupon",
                        finalAmount: 0,
                        couponCodeId: response?.couponCodeId || "",
                        discountAmount: response?.discountAmount || 0,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_ONE, workshop._id] });
                            queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_CURRICULUM] });
                            if (onPurchaseSuccess) onPurchaseSuccess();
                            window.location.href = `${baseLoginUrl}/login?payment_id=${paymentId}&workshop_id=${workshop?._id}`;
                        },
                        onError: (err: any) => {
                            setIsProcessingPayment(false);
                            AntdNotification(
                                notification,
                                "error",
                                err?.message || "Payment successful but workshop activation failed. Please contact support.",
                            );
                        },
                    }
                );
                return;
            }

            purchaseWorkshop(
                {
                    workshopId: workshop._id || "",
                    amount: workshop.price || 0,
                    paymentId: paymentId,
                    paymentMethod: "razorpay",
                    finalAmount: response?.finalAmount ?? (workshop.price || 0),
                    couponCodeId: response?.couponCodeId || "",
                    discountAmount: response?.discountAmount || 0,
                },
                {
                    onSuccess: () => {
                        // Invalidate queries to refresh UI
                        queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_ONE, workshop._id] });
                        queryClient.invalidateQueries({ queryKey: [KEYS.WORKSHOP_CURRICULUM] });
                        if (onPurchaseSuccess) onPurchaseSuccess();
                        window.location.href = `${baseLoginUrl}/login?payment_id=${paymentId}&workshop_id=${workshop?._id}`;
                    },
                    onError: (err: any) => {
                        setIsProcessingPayment(false);
                        AntdNotification(
                            notification,
                            "error",
                            err?.message || "Payment successful but workshop activation failed. Please contact support.",
                        );
                    },
                },
            );
        } else {
            localStorage.removeItem("guest_user_info");
            localStorage.removeItem("trigger_payment_id");
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
            <Loader loading={isProcessingPayment || isPurchasing} />
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
                                <PaymentModal
                                    btnText="Enroll Now"
                                    isLoading={isPurchasing}
                                    amount={Math.round(workshop?.price || 0)}
                                    workshopId={workshop?._id}
                                    userData={
                                        user
                                            ? {
                                                name: user.fullName,
                                                email: user.email,
                                                contact: user.phoneNumber || "",
                                            }
                                            : (() => {
                                                try {
                                                    const info = localStorage.getItem("guest_user_info");
                                                    return info ? JSON.parse(info) : undefined;
                                                } catch {
                                                    return undefined;
                                                }
                                            })()
                                    }
                                    onPaymentComplete={handlePaymentComplete}
                                    onClickOverride={() => {
                                        if (!user && !localStorage.getItem("guest_user_info")) {
                                            localStorage.setItem("trigger_payment_id", workshop?._id || "");
                                            dispatch(setAuthModalOpen({ open: true, context: { workshopId: workshop?._id } }));
                                            return true; // block payment start to show form
                                        }
                                        return false; // let payment proceed
                                    }}
                                    className="lp-button button button-purchase-course trigger-payment-btn"
                                />
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
