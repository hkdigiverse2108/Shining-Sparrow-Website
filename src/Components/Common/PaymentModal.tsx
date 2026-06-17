import { useEffect, useRef } from "react";
import type {
  PaymentModalProps,
  PaymentStatusType,
  RazorpayOptions,
  RazorpayResponse,
} from "../../Types";
import { PAYMENT_STATUS } from "../../Constants";
import { useAppSelector } from "../../Store/Hook";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: RazorpayResponse) => void,
      ) => void;
    };
  }
}

interface ExtendedPaymentModalProps extends PaymentModalProps {
  className?: string;
  disabled?: boolean;
}

const PaymentModal: React.FC<ExtendedPaymentModalProps> = ({
  isLoading,
  btnText,
  amount = 0,
  // userData = {},
  onPaymentComplete,
  className,
  disabled,
}) => {
  const hasHandledPayment = useRef<string | null>(null);

  const settings = useAppSelector((state) => state.settings.settings);
  const RazorPayKey = settings?.razorpayKey || "";

  // const { name, email, contact } = userData || {};

  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const startPayment = async () => {
    if (amount <= 0) {
      return onPaymentComplete(
        PAYMENT_STATUS.COMPLETED,
        { razorpay_payment_id: "" },
        "",
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
      onPaymentComplete(status, response, RazorPayKey);
    };

    const options: RazorpayOptions = {
      key: RazorPayKey,
      amount: amount * 100,
      currency: "INR",
      name: "HK DigiVerse",
      description: "Course Purchase",
      handler: (res) => safeComplete(PAYMENT_STATUS.COMPLETED, res),
      // prefill: {
      //   name,
      //   email,
      //   contact,
      // },
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

  return (
    <button
      onClick={startPayment}
      disabled={!RazorPayKey || isLoading || disabled}
      className={className || "btn primary_btn w-full !h-12 font-semibold mt-4"}
    >
      {btnText}
    </button>
  );
};

export default PaymentModal;
