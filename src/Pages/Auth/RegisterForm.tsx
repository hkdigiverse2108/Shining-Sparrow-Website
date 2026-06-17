import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormPasswordInput, FormCheckbox } from "../../Components/FormFields";
import { Mutation } from "../../Api";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const registerMutation = Mutation.useRegister();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    agreeTerms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    designation: Yup.string(),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const handleRegisterSubmit = (values: typeof initialValues) => {
    registerMutation.mutate(values, {
      onSuccess: (data) => {
        AntdNotification(
          notification,
          "success",
          data?.message || "Registration successful! Please login."
        );
        onSwitchToLogin();
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed. Please try again."
        );
      },
    });
  };

  return (
    <div className="  w-full! ">
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegisterSubmit}
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
              name="phone"
              id="phone"
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
                className="main-header-btn edu-btn btn-medium w-full!"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "Register"}
              </button>
            </p>
            <p className="my-0!">
              Already have an account? <a onClick={onSwitchToLogin} className="font-bold">Login here</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
