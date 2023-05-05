import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { REQUIRED_MESSAGE } from "../../config.js";
import { useState } from "react";
import { useToast } from "../Base.jsx";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFieldClasses } from "../../hooks/useFieldClasses.jsx";
import { ascesAPI } from "../../api/api.js";

const CreateAscesisSchema = Yup.object().shape({
  name: Yup.string()
    .required(REQUIRED_MESSAGE),
  started_at: Yup.date()
    .required(REQUIRED_MESSAGE),
  days: Yup.number()
    .integer()
    .min(1)
    .max(1000)
    .required(REQUIRED_MESSAGE)
});

function CreateAscesisDialog({ visible, setVisible }) {
  const { toast } = useToast();
  const [started_at] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      name: "",
      started_at: started_at,
      days: 100,
    },
    validationSchema: CreateAscesisSchema,
    onSubmit: async values => {
      ascesAPI.create(values).then(() => {
        setVisible(false);
        toast.current.show({severity:"success", summary: "Успешно", detail: "Аскеза успешно создана", life: 3000});
      });
    },
  });
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  
  const fieldClasses = useFieldClasses(["name", "started_at", "days"], isFormFieldInvalid);
  

  return (
    <Dialog
      header="Создание Аскезы"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Аскеза</label>
          <InputText 
            className={fieldClasses.name}
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}/>
          {getFormErrorMessage("name")}
        </div>
        <div className="field">
          <label htmlFor="start_date">Дата начала</label>
          <Calendar
            className={fieldClasses.started_at}
            id="started_at"
            dateFormat="dd.mm.yy"
            value={formik.values.started_at}
            onChange={formik.handleChange}/>
          {getFormErrorMessage("started_at")}
        </div>
        <div className="field">
          <label htmlFor="days">Кол-во дней</label>
          <InputNumber
            className={fieldClasses.days}
            id="days"
            min={1}
            max={1000}
            value={formik.values.days}
            onValueChange={formik.handleChange}/>
          {getFormErrorMessage("days")}
        </div>
        <div className="flex justify-content-end">
          <Button label="Создать" type="submit"/>
        </div>
      </form>
    </Dialog>
  );
}

CreateAscesisDialog.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};

export default CreateAscesisDialog;