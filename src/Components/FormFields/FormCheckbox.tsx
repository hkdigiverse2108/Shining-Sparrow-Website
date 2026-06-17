import React from "react";
import { useField } from "formik";

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
    label,
    containerClassName,
    labelClassName,
    errorClassName,
    ...props
}) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
        <div className={containerClassName || "woocommerce-form-row form-row mb-3!"}>
            <label className={labelClassName || "woocommerce-form__label woocommerce-form__label-for-checkbox"}>
                <input
                    {...field}
                    {...props}
                    type="checkbox"
                    className={props.className || "woocommerce-form__input woocommerce-form__input-checkbox"}
                />
                <span> {label}</span>
            </label>
            {meta.touched && meta.error ? (
                <span className={errorClassName || "text-red-500 text-sm mt-1 block"}>
                    {meta.error}
                </span>
            ) : null}
        </div>
    );
};

export default FormCheckbox;
