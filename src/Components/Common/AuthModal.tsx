import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setAuthModalOpen } from "../../Store/Slices/ModalSlice";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { FormCheckbox } from "../FormFields";

import { useAuthFlow } from "../../Hooks/useAuthFlow";
import { Mutation } from "../../Api";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { setUser } from "../../Store/Slices/UserSlice";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";

const FormField = ({ label, name, ...props }: { label: string; name: string; [key: string]: any }) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col w-full" style={{ marginBottom: "16px" }}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "8px",
          display: "block"
        }}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={name}
        className="w-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
        style={{
          width: "100%",
          height: "48px",
          paddingLeft: "16px",
          paddingRight: "16px",
          fontSize: "15px",
          color: "#1f2937",
          backgroundColor: "#ffffff",
          border: meta.touched && meta.error ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "10px",
          boxSizing: "border-box",
          display: "block"
        }}
      />
      {meta.touched && meta.error ? (
        <span
          className="text-red-500 text-xs font-medium block"
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "6px",
            display: "block"
          }}
        >
          {meta.error}
        </span>
      ) : null}
    </div>
  );
};

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, purchaseContext } = useAppSelector((state) => state.Modal);

  const { executeSignup, isPending } = useAuthFlow();
  const purchaseIntentMutation = Mutation.usePurchaseIntent();

  const handleClose = () => {
    dispatch(setAuthModalOpen(false));
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    district: "",
    std: "",
    reachFrom: "",
    agreeTerms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: purchaseContext
      ? Yup.string()
      : Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    district: Yup.string(),
    std: Yup.string(),
    reachFrom: Yup.string(),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    if (purchaseContext) {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        district: values.district,
        std: values.std,
        reachFrom: values.reachFrom,
        courseId: purchaseContext.courseId,
        workshopId: purchaseContext.workshopId,
      };
      purchaseIntentMutation.mutate(payload, {
        onSuccess: (response) => {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response?.data?.token);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response?.data));
          dispatch(setUser(response?.data));
          AntdNotification(notification, "success", response?.message || "Success");
          handleClose();
        },
        onError: (error: any) => {
          AntdNotification(
            notification,
            "error",
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again.",
          );
        },
      });
    } else {
      executeSignup(values, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  if (!isAuthModalOpen) return null;

  const isPendingSubmit = isPending || purchaseIntentMutation.isPending;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      style={{
        zIndex: 99999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full relative border border-gray-100 flex flex-col"
        style={{
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          padding: "40px",
          boxSizing: "border-box",
          overflowY: "auto",
          position: "relative",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Accent gradient bar */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(to right, #f97316, #ef4444, #ec4899)"
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "50%"
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-12" style={{ marginBottom: "32px", paddingRight: "48px" }}>
          <h3
            className="text-gray-900 tracking-tight"
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
              marginBottom: "8px",
              lineHeight: 1.2
            }}
          >
            {purchaseContext ? "Register to Complete Purchase" : "Fill The Form To Continue"}
          </h3>
          <p className="text-gray-500" style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Please fill in your details below to proceed. All fields marked with * are required.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6" style={{ width: "100%" }}>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
                style={{
                  display: "grid",
                  columnGap: "24px"
                }}
              >
                <FormField
                  label="Full Name *"
                  name="fullName"
                  placeholder="John Doe"
                />

                <FormField
                  label="Email address *"
                  name="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                />

                <FormField
                  label="Phone *"
                  name="phoneNumber"
                  placeholder="9876543210"
                  autoComplete="tel"
                />

                <FormField
                  label="District"
                  name="district"
                  placeholder="Enter district name"
                />

                <FormField
                  label="Standard"
                  name="std"
                  placeholder="e.g. 10th, 12th"
                />

                <FormField
                  label="How did you reach us?"
                  name="reachFrom"
                  placeholder="e.g. Instagram, Friends"
                />

                {!purchaseContext && (
                  <div className="md:col-span-2" style={{ gridColumn: "span 2 / span 2" }}>
                    <FormField
                      label="Password *"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                  </div>
                )}
              </div>

              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "24px",
                  borderTop: "1px solid #f3f4f6",
                  marginTop: "24px"
                }}
              >
                <FormCheckbox
                  label="I agree to the terms and conditions"
                  name="agreeTerms"
                  containerClassName="mb-0 cursor-pointer"
                  labelClassName="text-lg! text-gray-800! font-medium! cursor-pointer flex items-center gap-2.5!"
                />

                <button
                  type="submit"
                  disabled={isPendingSubmit}
                  className="hover:shadow-lg transition-all"
                  style={{
                    background: "linear-gradient(to right, #f97316, #ef4444)",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    height: "48px",
                    fontWeight: 700,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    opacity: isPendingSubmit ? 0.7 : 1
                  }}
                >
                  {isPendingSubmit ? (
                    <span>Processing...</span>
                  ) : (
                    <span>Submit & Continue</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthModal;
