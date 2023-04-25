import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { REQUIRED_MESSAGE } from "../../config.js";
import { API } from "../../api.js";
import React from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
 
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

function CreateAscesis({ toast }) {
  const [started_at] = React.useState(new Date());
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      started_at: started_at,
      days: 1,
    },
    validationSchema: CreateAscesisSchema,
    onSubmit: values => {
      let data = {...values};
      data.started_at = data.started_at.getTime();
      API.post("/asces", data)
        .then(() => {
          toast.current.show({severity:"success", summary: "Успешно", detail: "Аскеза успешно создана", life: 3000});
          navigate("/");
        });
    },
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <Card>
      <h2>Создание Аскезы</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Аскеза</label>
          <InputText 
            className={"w-full " + classNames({ "p-invalid": isFormFieldInvalid("name") })}
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}/>
        </div>
        {getFormErrorMessage("name")}
        <div className="field">
          <label htmlFor="start_date">Дата начала</label>
          <Calendar
            className={"w-full " + classNames({ "p-invalid": isFormFieldInvalid("start_date") })}
            id="started_at"
            dateFormat="dd.mm.yy"
            value={formik.values.started_at}
            onChange={formik.handleChange}/>
          {getFormErrorMessage("started_at")}
        </div>
        <div className="field">
          <label htmlFor="days">Кол-во дней</label>
          <InputNumber
            className={"w-full " + classNames({ "p-invalid": isFormFieldInvalid("days") })}
            id="days"
            min={1}
            max={1000}
            value={formik.values.days}
            onValueChange={formik.handleChange}/>
        </div>
        <Button label="Создать" type="submit"/>
      </form>
    </Card>
  );
}

CreateAscesis.propTypes = {
  toast: PropTypes.object
};


export default CreateAscesis;