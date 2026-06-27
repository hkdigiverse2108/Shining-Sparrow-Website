import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setAuthModalOpen } from "../../Store/Slices/ModalSlice";
import { setUser } from "../../Store/Slices/UserSlice";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { FormCheckbox } from "../FormFields";

import { useAuthFlow } from "../../Hooks/useAuthFlow";
import { Mutation } from "../../Api";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";

const GUJARAT_DISTRICTS = [
  "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", 
  "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhumi Dwarka", 
  "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", 
  "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", 
  "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
  "Tapi", "Vadodara", "Valsad"
];

const STD_OPTIONS = [
  { label: "1st Std", value: "1st Std" },
  { label: "2nd Std", value: "2nd Std" },
  { label: "3rd Std", value: "3rd Std" },
  { label: "4th Std", value: "4th Std" },
  { label: "5th Std", value: "5th Std" },
  { label: "6th Std", value: "6th Std" },
  { label: "7th Std", value: "7th Std" },
  { label: "8th Std", value: "8th Std" },
  { label: "9th Std", value: "9th Std" },
  { label: "10th Std", value: "10th Std" },
  { label: "11th Std", value: "11th Std" },
  { label: "12th Std", value: "12th Std" },
  { label: "Adult Learner", value: "Adult Learner" }
];

const REACH_OPTIONS = [
  { label: "Instagram", value: "Instagram" },
  { label: "Facebook", value: "Facebook" },
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "Friends/relatives", value: "Friends/relatives" },
  { label: "Webinars", value: "Webinars" },
  { label: "Offline branch visit", value: "Offline branch visit" },
  { label: "Web search", value: "Web search" },
  { label: "Schools", value: "Schools" },
  { label: "Others", value: "Others" }
];

const FormSelect = ({
  label,
  name,
  options,
  openUpwards = false,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  openUpwards?: boolean;
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <div className="flex flex-col w-full" style={{ marginBottom: "16px" }} ref={containerRef}>
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
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full transition-all cursor-pointer flex items-center justify-between"
          style={{
            width: "100%",
            height: "48px",
            paddingLeft: "16px",
            paddingRight: "16px",
            fontSize: "15px",
            color: field.value ? "#1f2937" : "#9ca3af",
            backgroundColor: "#ffffff",
            border: meta.touched && meta.error ? "1px solid #ef4444" : (isOpen ? "1px solid #f97316" : "1px solid #d1d5db"),
            borderRadius: "10px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span>{selectedOption ? selectedOption.label : `Select ${label}`}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {field.value && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  helpers.setValue("");
                }}
                className="hover:text-red-500 transition-colors duration-150 p-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#9ca3af",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ width: "16px", height: "16px", strokeWidth: "2.5" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ width: "16px", height: "16px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              bottom: openUpwards ? "100%" : undefined,
              top: openUpwards ? undefined : "100%",
              left: 0,
              right: 0,
              marginBottom: openUpwards ? "4px" : undefined,
              marginTop: openUpwards ? undefined : "4px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              boxShadow: openUpwards
                ? "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              zIndex: 9999,
              maxHeight: "220px",
              overflowY: "auto"
            }}
          >
            <div
              onClick={() => {
                helpers.setValue("");
                helpers.setTouched(true);
                setIsOpen(false);
              }}
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                color: "#9ca3af",
                cursor: "pointer",
                backgroundColor: field.value === "" ? "#ffedd5" : "transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffedd5";
                e.currentTarget.style.color = "#ea580c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = field.value === "" ? "#ffedd5" : "transparent";
                e.currentTarget.style.color = field.value === "" ? "#ea580c" : "#9ca3af";
              }}
            >
              Select {label}
            </div>
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  helpers.setValue(opt.value);
                  helpers.setTouched(true);
                  setIsOpen(false);
                }}
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: field.value === opt.value ? "#ea580c" : "#374151",
                  cursor: "pointer",
                  backgroundColor: field.value === opt.value ? "#ffedd5" : "transparent",
                  transition: "background-color 0.2s, color 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffedd5";
                  e.currentTarget.style.color = "#ea580c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = field.value === opt.value ? "#ffedd5" : "transparent";
                  e.currentTarget.style.color = field.value === opt.value ? "#ea580c" : "#374151";
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
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
        onChange={(e) => {
          if (name === "email" || props.type === "email") {
            e.target.value = e.target.value.toLowerCase();
          }
          field.onChange(e);
        }}
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

  const [districts, setDistricts] = useState<string[]>(GUJARAT_DISTRICTS);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/somen-das/indian-states-and-districts-json/master/states-and-districts.json")
      .then((res) => res.json())
      .then((data) => {
        const gujState = data.states?.find((s: any) => s.state === "Gujarat");
        if (gujState && Array.isArray(gujState.districts)) {
          setDistricts(gujState.districts.sort());
        }
      })
      .catch(() => {
        // Fallback silently to static list on error
      });
  }, []);

  const handleClose = () => {
    localStorage.removeItem("trigger_payment_id");
    localStorage.removeItem("guest_user_info");
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
        onSuccess: (res: any) => {
          const userData = res?.data;
          const token = userData?.token;
          if (userData && token) {
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
            dispatch(setUser(userData));
          }
          localStorage.setItem("trigger_payment_id", purchaseContext.courseId || purchaseContext.workshopId || "");
          localStorage.setItem("guest_user_info", JSON.stringify({
            name: values.fullName,
            email: values.email,
            contact: values.phoneNumber,
          }));
          AntdNotification(notification, "success", "Details registered! Opening payment...");
          dispatch(setAuthModalOpen(false));
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

  return createPortal(
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
            borderRadius: "50%",
            zIndex: 50
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

                <FormSelect
                  label="District"
                  name="district"
                  options={districts.map((d) => ({ label: d, value: d }))}
                />

                <FormSelect
                  label="Standard"
                  name="std"
                  options={STD_OPTIONS}
                  openUpwards={true}
                />

                <FormSelect
                  label="How did you reach us?"
                  name="reachFrom"
                  options={REACH_OPTIONS}
                  openUpwards={true}
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
                    <span>Save & Continue</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
