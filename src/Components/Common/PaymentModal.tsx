import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  PaymentModalProps,
  PaymentStatusType,
  RazorpayOptions,
} from "../../Types";
import { PAYMENT_STATUS } from "../../Constants";
import { useAppSelector } from "../../Store/Hook";
import { Mutation } from "../../Api";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: any) => void,
      ) => void;
    };
  }
}

interface ExtendedPaymentModalProps extends PaymentModalProps {
  className?: string;
  disabled?: boolean;
  onClickOverride?: () => boolean;
  courseId?: string;
  workshopId?: string;
}

const PaymentModal: React.FC<ExtendedPaymentModalProps> = ({
  isLoading,
  btnText,
  amount = 0,
  onPaymentComplete,
  className,
  disabled,
  onClickOverride,
  courseId,
  workshopId,
}) => {
  const hasHandledPayment = useRef<string | null>(null);
  
  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const validateCouponMutation = Mutation.useValidateCoupon();

  const settings = useAppSelector((state) => state.settings.settings);
  const RazorPayKey = settings?.razorpayKey || "";

  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleOpenCheckout = () => {
    // If auth override blocks it, do not open checkout modal
    if (onClickOverride && onClickOverride()) {
      return;
    }
    setShowCheckout(true);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponError("");
    
    validateCouponMutation.mutate(
      {
        code: couponCode.trim().toUpperCase(),
        appliesToId: courseId || workshopId,
        amount,
      },
      {
        onSuccess: (res: any) => {
          if (res?.data?.coupon) {
            const coupon = res.data.coupon;
            setAppliedCoupon(coupon);
            let disc = 0;
            if (coupon.discountType === "percentage") {
              disc = (amount * coupon.discountValue) / 100;
            } else {
              disc = coupon.discountValue;
            }
            setDiscountAmount(Math.min(disc, amount));
          } else {
            setCouponError("Invalid coupon response.");
          }
        },
        onError: (err: any) => {
          setCouponError(err.message || "Invalid or expired coupon code.");
        },
      }
    );
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setDiscountAmount(0);
    setCouponError("");
  };

  const startPayment = async () => {
    const finalAmount = Math.max(amount - discountAmount, 0);

    if (finalAmount <= 0) {
      setShowCheckout(false);
      return onPaymentComplete(
        PAYMENT_STATUS.COMPLETED,
        { razorpay_payment_id: `FREE_COUPON_${appliedCoupon?.code || "OFFER"}`, couponCodeId: appliedCoupon?._id || "", discountAmount, finalAmount: 0 },
        ""
      );
    }

    if (!window.Razorpay) {
      console.error("Razorpay not loaded!");
      return;
    }

    if (!RazorPayKey) {
      console.error("Razorpay Key is missing");
      return;
    }

    const safeComplete = (status: PaymentStatusType, response: any) => {
      const currentPaymentId =
        response?.razorpay_payment_id || "FAILED_ATTEMPT";

      if (hasHandledPayment.current === currentPaymentId) return;
      hasHandledPayment.current = currentPaymentId;
      setShowCheckout(false);
      // Attach coupon info to the response so the parent can include it in the purchase API call
      const enrichedResponse = {
        ...response,
        couponCodeId: appliedCoupon?._id || "",
        discountAmount: discountAmount || 0,
        finalAmount: finalPayable,
      };
      onPaymentComplete(status, enrichedResponse, RazorPayKey);
    };

    const options: RazorpayOptions = {
      key: RazorPayKey,
      amount: finalAmount * 100,
      currency: "INR",
      name: "Shining Sparrow",
      description: "Course Purchase",
      handler: (res) => safeComplete(PAYMENT_STATUS.COMPLETED, res),
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);

    const handleFail = (res: any) => {
      const failedResponse = {
        razorpay_payment_id: res?.error?.metadata?.payment_id || "",
        error: res?.error,
      };
      safeComplete(PAYMENT_STATUS.FAILED, failedResponse);
    };

    rzp.on("payment.failed", handleFail);
    rzp.open();
  };

  const finalPayable = Math.max(amount - discountAmount, 0);

  return (
    <>
      <button
        onClick={handleOpenCheckout}
        disabled={!RazorPayKey || isLoading || disabled}
        className={className || "btn primary_btn w-full !h-12 font-semibold mt-4"}
      >
        {btnText}
      </button>

      {/* Checkout and Coupon Details Modal */}
      {showCheckout && createPortal(
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <div 
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #f1f5f9",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              boxSizing: "border-box",
              color: "#334155",
            }}
          >
            {/* Header */}
            <div 
              style={{ 
                display: "flex", 
                justifyContent: "between", 
                alignItems: "center", 
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "12px",
                width: "100%",
              }}
            >
              <h3 
                style={{ 
                  fontSize: "20px", 
                  fontWeight: 800, 
                  color: "#0f172a", 
                  margin: 0,
                  flexGrow: 1,
                  textAlign: "left",
                }}
              >
                Checkout Details
              </h3>
              
              {/* Custom Close Icon (using div + span to bypass global button styling) */}
              <div
                role="button"
                onClick={() => setShowCheckout(false)}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <svg style={{ width: "20px", height: "20px", color: "#94a3b8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Price Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                <span>Original Price</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{amount.toFixed(2)}</span>
              </div>

              {/* Coupon input */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px", textAlign: "left" }}>
                  Apply Coupon Code
                </span>
                {!appliedCoupon ? (
                  <div style={{ display: "flex", gap: "8px", width: "100%", boxSizing: "border-box" }}>
                    <input
                      type="text"
                      placeholder="ENTER COUPON"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      style={{
                        flexGrow: 1,
                        padding: "8px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "12px",
                        outline: "none",
                        fontSize: "14px",
                        height: "42px",
                        boxSizing: "border-box",
                        width: "1px", // hack to let flex-grow determine width properly
                        backgroundColor: "#ffffff",
                        color: "#1e293b",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#f97316"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
                    />
                    <div
                      role="button"
                      onClick={handleApplyCoupon}
                      style={{
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        backgroundColor: "#f97316",
                        color: "#ffffff",
                        fontWeight: 700,
                        borderRadius: "12px",
                        fontSize: "14px",
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        userSelect: "none",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ea580c"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f97316"}
                    >
                      {validateCouponMutation.isPending ? "Applying..." : "Apply"}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", backgroundColor: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "12px", boxSizing: "border-box" }}>
                    <div style={{ fontSize: "12px", color: "#431407", textAlign: "left" }}>
                      <span style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "14px", display: "block" }}>{appliedCoupon.code}</span>
                      <span>
                        Saved ₹{discountAmount.toFixed(2)} ({appliedCoupon.discountType === "percentage" ? `${appliedCoupon.discountValue}%` : "flat"} off)
                      </span>
                    </div>
                    <div
                      role="button"
                      onClick={handleRemoveCoupon}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#ea580c",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </div>
                  </div>
                )}

                {couponError && (
                  <p style={{ fontSize: "12px", color: "#ef4444", fontWeight: 550, margin: "6px 0 0 0", textAlign: "left" }}>{couponError}</p>
                )}
              </div>

              {/* Total breakdown */}
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                <span>Total Payable</span>
                <span style={{ fontSize: "18px", color: "#ea580c" }}>₹{finalPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons (using custom divs styled as buttons to bypass theme overrides) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <div
                role="button"
                onClick={startPayment}
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#f97316",
                  color: "#ffffff",
                  fontWeight: 800,
                  borderRadius: "12px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.2)",
                  boxSizing: "border-box",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ea580c"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f97316"}
              >
                {finalPayable <= 0 ? "Complete Purchase" : `Proceed to Pay ₹${finalPayable.toFixed(2)}`}
              </div>
              
              <div
                role="button"
                onClick={() => setShowCheckout(false)}
                style={{
                  width: "100%",
                  height: "44px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  fontWeight: 700,
                  borderRadius: "12px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e2e8f0"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PaymentModal;
