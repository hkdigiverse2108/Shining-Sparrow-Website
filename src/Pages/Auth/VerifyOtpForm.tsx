import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../Components/FormFields";
import { Mutation } from "../../Api";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";
import { useAppDispatch } from "../../Store/Hook";
import { setUser } from "../../Store/Slices/UserSlice";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";

interface VerifyOtpFormProps {
  email: string;
  onSwitchToLogin: () => void;
}

const VerifyOtpForm = ({ email, onSwitchToLogin }: VerifyOtpFormProps) => {
  const [timer, setTimer] = useState(60);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const verifyOtpMutation = Mutation.useVerifyOtp();
  const resendOtpMutation = Mutation.useResendOtp();

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyOtpSubmit = (values: { otp: string }) => {
    verifyOtpMutation.mutate(
      { email, otp: values.otp },
      {
        onSuccess: (data) => {
          AntdNotification(
            notification,
            "success",
            "Email verified successfully! Welcome to HK DigiSkill."
          );
          // Store token and user data (same as login flow)
          localStorage.setItem(STORAGE_KEYS.TOKEN, data?.data?.token);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data?.data));
          dispatch(setUser(data?.data));
          setTimeout(() => {
            navigate(ROUTES.HOME);
            window.location.reload();
          }, 500);
        },
        onError: (error: any) => {
          AntdNotification(
            notification,
            "error",
            error?.response?.data?.message || "OTP verification failed. Please try again."
          );
        },
      }
    );
  };

  const handleResendOtp = () => {
    resendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          AntdNotification(notification, "success", "OTP resent successfully! Check your email.");
          setTimer(60);
        },
        onError: (error: any) => {
          AntdNotification(
            notification,
            "error",
            error?.response?.data?.message || "Failed to resend OTP."
          );
        },
      }
    );
  };

  return (
    <div className="w-full!">
      <h2>Verify Your Email</h2>
      <p style={{ color: "#555", fontSize: "14px", marginBottom: "16px" }}>
        We sent a 6-digit OTP to <strong>{email}</strong>. Please enter it below to verify your account.
      </p>

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={Yup.object({
          otp: Yup.string()
            .length(6, "OTP must be exactly 6 digits")
            .required("OTP is required"),
        })}
        onSubmit={handleVerifyOtpSubmit}
      >
        {() => (
          <Form className="woocommerce-form woocommerce-form-login login auth-form">
            <FormInput
              label="Enter OTP *"
              name="otp"
              type="text"
              id="signup_otp"
              autoComplete="one-time-code"
              containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
              className="woocommerce-Input woocommerce-Input--text input-text form"
            />

            <p className="woocommerce-form-row form-row">
              <button
                type="submit"
                className="main-header-btn edu-btn btn-medium w-full!"
                disabled={verifyOtpMutation.isPending}
              >
                {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
              </button>
            </p>

            <div className="flex justify-center px-2! pb-0!">
              <span>
                Didn't receive OTP?{" "}
                {timer > 0 ? (
                  <span style={{ color: "#888" }}>Resend in {timer}s</span>
                ) : (
                  <a
                    onClick={handleResendOtp}
                    className="cursor-pointer font-bold"
                    style={{ color: "#F26522" }}
                  >
                    {resendOtpMutation.isPending ? "Sending..." : "Resend OTP"}
                  </a>
                )}
              </span>
            </div>

            <div className="flex justify-center px-2! pt-2! pb-0!">
              <span>
                Wrong email?{" "}
                <a onClick={onSwitchToLogin} className="cursor-pointer">
                  Back to Login
                </a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOtpForm;
