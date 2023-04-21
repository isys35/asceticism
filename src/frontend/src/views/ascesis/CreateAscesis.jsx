import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import {useFormik} from "formik";

function CreateAscesis() {
  const formik = useFormik({
    initialValues: {
      name: "",
      start_date: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Card>
      <h2>Создание Аскезы</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Аскеза</label>
          <InputText
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="start_date">Дата начала</label>
          <Calendar
            id="start_date"
            dateFormat="dd.mm.yy"
            value={formik.values.start_date}
            onChange={formik.handleChange}/>
        </div>
        <Button label="Создать" type="submit"/>
      </form>
    </Card>
  );
}


export default CreateAscesis;