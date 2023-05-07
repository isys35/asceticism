import useFormikFieldErrors from "../../../hooks/useFormikFieldErrors.jsx";
import PropTypes from "prop-types";

export default function FieldWrapper({ fieldName, label, formik, children }) {
  const [, getFormErrorMessage] = useFormikFieldErrors(formik);
  return (
    <div className="field">
      <label htmlFor={fieldName}>{label}</label>
      {children}
      {getFormErrorMessage(fieldName)}
    </div>
  );
}

FieldWrapper.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.object,
  children: PropTypes.element,
};
