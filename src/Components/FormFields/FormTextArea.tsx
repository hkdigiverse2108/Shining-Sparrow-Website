import React from "react";
import { useField } from "formik";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    name: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);

    return (
        <div className="edublink-contact-form-single-item">
            <div className="edublink-contact-form-single-item-content edublink-contact-form-textarea">
                <p>
                    {label && <label htmlFor={props.id || props.name}>{label}</label>}
                    <textarea
                        {...field}
                        {...props}
                        className={`${props.className || "wpcf7-form-control wpcf7-textarea edublink-contact-form-textarea edublink-contact-form-field"} ${meta.touched && meta.error ? "border-red-500!" : ""
                            }`}
                    />
                    {meta.touched && meta.error ? (
                        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
                    ) : null}
                </p>
            </div>
        </div>
    );
};

export default FormTextArea;
