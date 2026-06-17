import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppDispatch } from "../Store/Hook";
import { setUser } from "../Store/Slices/UserSlice";
import { STORAGE_KEYS } from "../Constants/StorageKeys";
import { AntdNotification } from "../Utils/AntNotification";
import { notification } from "antd";
import { Mutation } from "../Api";
import type { RegisterPayload } from "../Types";

export const useAuthFlow = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signupMutation = Mutation.useUserSignup();

  const handleLoginSuccess = (data: any) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data?.data?.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data?.data));
    dispatch(setUser(data?.data));
    AntdNotification(notification, "success", data?.message);

    setTimeout(() => {
      navigate(ROUTES.HOME);
      window.location.reload();
    }, 500);
  };

  const executeSignup = (
    values: RegisterPayload,
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    },
  ) => {
    signupMutation.mutate(values, {
      onSuccess: (response) => {
        handleLoginSuccess(response);
        if (options?.onSuccess) options.onSuccess(response?.data);
      },
      onError: (error: any) => {
        AntdNotification(
          notification,
          "error",
          error?.response?.data?.message ||
            error?.message ||
            "Authentication failed. Please try again.",
        );
        if (options?.onError) options.onError(error);
      },
    });
  };

  return {
    executeSignup,
    isPending: signupMutation.isPending,
  };
};
