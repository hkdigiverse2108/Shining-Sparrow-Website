import React from "react";
import { useField } from "formik";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    containerClassName,
    labelClassName,
    errorClassName,
    ...props
}) => {
    const [field, meta] = useField(props.name);

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
                <input
                    {...field}
                    {...props}
                    className={`${props.className ||
                        "wpcf7-form-control wpcf7-text edublink-contact-form-field"
                        } ${meta.touched && meta.error ? "border-red-500!" : ""}`}
                />
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

export default FormInput;
