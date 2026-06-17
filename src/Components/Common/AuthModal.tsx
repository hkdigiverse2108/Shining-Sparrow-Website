import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setAuthModalOpen } from "../../Store/Slices/ModalSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormPasswordInput, FormCheckbox } from "../FormFields";

import { useAuthFlow } from "../../Hooks/useAuthFlow";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen } = useAppSelector((state) => state.Modal);

  const { executeSignup, isPending } = useAuthFlow();

  const handleClose = () => {
    dispatch(setAuthModalOpen(false));
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    designation: "",
    agreeTerms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    designation: Yup.string(),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    executeSignup(values, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (!isAuthModalOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="modal-overlay fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-999!"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content bg-white p-8! rounded-xl shadow-2xl max-w-250 w-full mx-4! relative overflow-hidden"
      >
        <div className="mb-9! ">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800  my-3! sm:my-6!">
            Fill The Form To Continue
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="woocommerce-form woocommerce-form-register register auth-form">
              <FormInput
                label="Full Name *"
                name="fullName"
                id="fullName"
                autoComplete="name"
                containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
                className="woocommerce-Input woocommerce-Input--text input-text"
              />

              <FormInput
                label="Email address *"
                name="email"
                id="reg_email"
                autoComplete="email"
                containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
                className="woocommerce-Input woocommerce-Input--text input-text"
              />

              <FormInput
                label="Phone"
                name="phoneNumber"
                id="phoneNumber"
                autoComplete="tel"
                containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
                className="woocommerce-Input woocommerce-Input--text input-text"
              />

              <FormInput
                label="Designation"
                name="designation"
                id="designation"
                autoComplete="organization-title"
                containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
                className="woocommerce-Input woocommerce-Input--text input-text"
              />

              <FormPasswordInput
                label="Password"
                name="password"
                id="reg_password"
                autoComplete="new-password"
                containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
                className="woocommerce-Input woocommerce-Input--text input-text"
              />

              <FormCheckbox
                label="I agree to the terms and conditions"
                name="agreeTerms"
                containerClassName="woocommerce-form-row form-row mb-3!"
              />

              <p className="woocommerce-form-row form-row mb-3!">
                <button
                  type="submit"
                  disabled={isPending}
                  className="main-header-btn edu-btn btn-medium w-full! disabled:opacity-70"
                >
                  {isPending ? (
                    <span>Processing...</span>
                  ) : (
                    <span>Submit & Continue</span>
                  )}
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthModal;
