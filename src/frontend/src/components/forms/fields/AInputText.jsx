import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import FieldWrapper from "./FieldWrapper.jsx";
import useWidgetMainProps from "../../../hooks/useWidgetMainProps.jsx";

export default function AInputText(props) {
  const widgetMainProps = useWidgetMainProps(props);

  return (
    <FieldWrapper {...props}>
      <InputText {...widgetMainProps} />
    </FieldWrapper>
  );
}

AInputText.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.object,
};
