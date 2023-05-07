import { InputNumber } from "primereact/inputnumber";
import PropTypes from "prop-types";
import FieldWrapper from "./FieldWrapper.jsx";
import useWidgetMainProps from "../../../hooks/useWidgetMainProps.jsx";

export default function AInputNumber(props) {
  const widgetMainProps = useWidgetMainProps(props);
  delete widgetMainProps.onChange;
  console.log(props.formik.values.days);
  return (
    <FieldWrapper {...props}>
      <InputNumber
        {...widgetMainProps}
        onValueChange={props.formik.handleChange}
      />
    </FieldWrapper>
  );
}

AInputNumber.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.object,
};
