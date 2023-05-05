import useFormikFieldErrors from "./useFormikFieldErrors.jsx";
import {useFieldClasses} from "./useFieldClasses.jsx";


export default function useWidgetMainProps({ fieldName, formik }) {
  const [isFormFieldInvalid, ] = useFormikFieldErrors(formik);
  const fieldClasses = useFieldClasses([fieldName], isFormFieldInvalid);
  return {
    className: fieldClasses[fieldName],
    value: formik.values[fieldName],
    id: fieldName,
    onChange: formik.handleChange
  };
}