import { Mutation } from "../../Api";
import { useAppDispatch } from "../../Store/Hook";
import { setUser } from "../../Store/Slices/UserSlice";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, FormPasswordInput } from "../../Components/FormFields";
import { AntdNotification } from "../../Utils/AntNotification";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
}

const LoginForm = ({ onSwitchToRegister, onSwitchToForgot }: LoginFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginMutation = Mutation.useLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = (values: typeof initialValues) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data?.data?.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data?.data));
        dispatch(setUser(data?.data));
        AntdNotification(notification, "success", "Logged in successfully!");
        setTimeout(() => {
          navigate(ROUTES.HOME);
          window.location.reload();
        }, 500);
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.message || "Login failed. Please check your credentials."
        );
      },
    });
  };

  return (
    <div className="  w-full! ">
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {() => (
          <Form className="woocommerce-form woocommerce-form-login login auth-form">
            <FormInput
              label="Username or email address *"
              name="email"
              type="text"
              id="username"
              autoComplete="username"
              containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
              className="woocommerce-Input woocommerce-Input--text input-text form"
            />

            <FormPasswordInput
              label="Password *"
              name="password"
              id="password"
              autoComplete="current-password"
              containerClassName="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-3!"
              className="woocommerce-Input woocommerce-Input--text input-text"
            />

            <p className="woocommerce-form-row form-row mb-3!">
              <button
                type="submit"
                className="main-header-btn edu-btn btn-medium w-full!"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Log in"}
              </button>
            </p>

            <div className="flex max-sm:flex-col! justify-between gap-6! px-2! pb-0!">
              <span className="woocommerce-LostPassword lost_password font-bold ">
                <a onClick={onSwitchToForgot}>Forgot your password?</a>
              </span>
              <span>
                Don't have an account?{" "}
                <a onClick={onSwitchToRegister} className="font-bold">Register here</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
