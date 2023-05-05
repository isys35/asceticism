import { InputNumber } from "primereact/inputnumber";
import PropTypes from "prop-types";
import FieldWrapper from "./FieldWrapper.jsx";
import useWidgetMainProps from "../../../hooks/useWidgetMainProps.jsx";


export default function AInputNumber(props) {
  const widgetMainProps = useWidgetMainProps(props);

  return (
    <FieldWrapper {...props}>
      <InputNumber {...widgetMainProps}/>
    </FieldWrapper>
  );
}


AInputNumber.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.object
};
