import React, { useState } from "react";
import { useField } from "formik";

interface FormPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
    label,
    containerClassName,
    labelClassName,
    errorClassName,
    ...props
}) => {
    const [field, meta] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={containerClassName || "edublink-contact-form-single-item"}>
            <div className="edublink-contact-form-single-item-content">
                {label && (
                    <label
                        htmlFor={props.id || props.name}
                        className={labelClassName || ""}
                    >
                        {label}
                    </label>
                )}
                <span className="password-input">
                    <input
                        {...field}
                        {...props}
                        type={showPassword ? "text" : "password"}
                        className={`${props.className ||
                            "wpcf7-form-control wpcf7-text edublink-contact-form-field"
                            } ${meta.touched && meta.error ? "border-red-500!" : ""}`}
                    />
                    <button
                        type="button"
                        className={`show-password-input ${showPassword ? "display-password" : ""
                            }`}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </span>
                {meta.touched && meta.error ? (
                    <span
                        className={errorClassName || "text-red-500 text-sm mt-1 block"}
                    >
                        {meta.error}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default FormPasswordInput;
