import {Calendar} from "primereact/calendar";
import FieldWrapper from "./FieldWrapper.jsx";
import PropTypes from "prop-types";
import useWidgetMainProps from "../../../hooks/useWidgetMainProps.jsx";

export default function ACalendar(props) {
  const widgetMainProps = useWidgetMainProps(props);
  return (
    <FieldWrapper {...props}>
      <Calendar
        {...widgetMainProps}
        dateFormat="dd.mm.yy"
      />
    </FieldWrapper>
  );
}

ACalendar.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.object
};