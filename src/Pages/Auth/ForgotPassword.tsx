import { useState, useEffect } from "react";
import { Mutation } from "../../Api";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormPasswordInput } from "../../Components/FormFields";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";

interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
}

const ForgotPassword = ({ onSwitchToLogin }: ForgotPasswordProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const forgotPasswordMutation = Mutation.useForgotPassword();
  const verifyOtpMutation = Mutation.useVerifyOtp();
  const resendOtpMutation = Mutation.useResendOtp();
  const resetPasswordMutation = Mutation.useResetPassword();

  useEffect(() => {
    const storedEndTime = localStorage.getItem('otpEndTime');
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime);
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimer(remaining);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem('otpEndTime');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleForgotPasswordSubmit = (values: { email: string }) => {
    setEmail(values.email);
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        AntdNotification(notification, "success", "OTP sent successfully to your email!");
        setStep('otp');
        const endTime = Date.now() + 60000;
        localStorage.setItem('otpEndTime', endTime.toString());
        setTimer(60);
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message || "Failed to send OTP. Please try again."
        );
      },
    });
  };

  const handleVerifyOtpSubmit = (values: { otp: string }) => {
    verifyOtpMutation.mutate({ email, otp: values.otp }, {
      onSuccess: () => {
        AntdNotification(notification, "success", "OTP verified successfully!");
        setStep('reset');
        localStorage.removeItem('otpEndTime');
        setTimer(0);
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message || "OTP verification failed."
        );
      },
    });
  };

  const handleResendOtp = () => {
    resendOtpMutation.mutate({ email }, {
      onSuccess: () => {
        AntdNotification(notification, "success", "OTP resent successfully!");
        const endTime = Date.now() + 60000;
        localStorage.setItem('otpEndTime', endTime.toString());
        setTimer(60);
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message || "Failed to resend OTP."
        );
      },
    });
  };

  const handleResetPasswordSubmit = (values: { newPassword: string }) => {
    resetPasswordMutation.mutate({ email, newPassword: values.newPassword }, {
      onSuccess: () => {
        AntdNotification(notification, "success", "Password reset successfully! You can now login.");
        navigate('/my-account');
        onSwitchToLogin();
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message || "Password reset failed."
        );
      },
    });
  };

  const renderEmailStep = () => (
    <div className="w-full!">
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={handleForgotPasswordSubmit}
      >
        {() => (
          <Form className="woocommerce-form woocommerce-form-login login auth-form">
            <FormInput
              label="Email address *"
              name="email"
              type="email"
              id="email"
              autoComplete="email"
              containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
              className="woocommerce-Input woocommerce-Input--text input-text form"
            />
            <p className="woocommerce-form-row form-row">
              <button
                type="submit"
                className="main-header-btn edu-btn btn-medium w-full!"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
              </button>
            </p>
            <div className="flex justify-center px-2! pb-0!">
              <span>
                Remember your password?{" "}
                <a onClick={onSwitchToLogin} className="cursor-pointer">Login here</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

  const renderOtpStep = () => (
    <div className="w-full!">
      <h2>Verify OTP</h2>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={Yup.object({
          otp: Yup.string().required("Required"),
        })}
        onSubmit={handleVerifyOtpSubmit}
      >
        {() => (
          <Form className="woocommerce-form woocommerce-form-login login auth-form">
            <FormInput
              label="OTP *"
              name="otp"
              type="text"
              id="otp"
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
                  <span>Resend in {timer}s</span>
                ) : (
                  <a onClick={handleResendOtp} className="cursor-pointer">Resend OTP</a>
                )}
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

  const renderResetStep = () => (
    <div className="w-full!">
      <h2>Reset Password</h2>
      <Formik
        initialValues={{ newPassword: '' }}
        validationSchema={Yup.object({
          newPassword: Yup.string()
            .min(6, "Must be at least 6 characters")
            .required("Required"),
        })}
        onSubmit={handleResetPasswordSubmit}
      >
        {() => (
          <Form className="woocommerce-form woocommerce-form-login login auth-form">
            <FormPasswordInput
              label="New Password *"
              name="newPassword"
              id="newPassword"
              containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
              className="woocommerce-Input woocommerce-Input--text input-text"
            />
            <p className="woocommerce-form-row form-row">
              <button
                type="submit"
                className="main-header-btn edu-btn btn-medium w-full!"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <>
      {step === 'email' && renderEmailStep()}
      {step === 'otp' && renderOtpStep()}
      {step === 'reset' && renderResetStep()}
    </>
  );
};

export default ForgotPassword;