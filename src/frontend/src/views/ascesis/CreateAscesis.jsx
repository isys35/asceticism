import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
 
const CreateAscesisSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обязательное поле"),
  start_date: Yup.date()
    .required("Обязательное поле"),
});

function CreateAscesis() {
  const formik = useFormik({
    initialValues: {
      name: "",
      start_date: ""
    },
    validationSchema: CreateAscesisSchema,
    onSubmit: values => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
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
            id="start_date"
            dateFormat="dd.mm.yy"
            value={formik.values.start_date}
            onChange={formik.handleChange}/>
          {getFormErrorMessage("start_date")}
        </div>
        <Button label="Создать" type="submit"/>
      </form>
    </Card>
  );
}


export default CreateAscesis;