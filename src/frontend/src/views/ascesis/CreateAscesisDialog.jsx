import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { REQUIRED_MESSAGE } from "../../config.js";
import { useToast } from "../Base.jsx";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { ascesAPI } from "../../api/api.js";
import AInputText from "../../components/forms/fields/AInputText.jsx";
import ACalendar from "../../components/forms/fields/ACalendar.jsx";
import AInputNumber from "../../components/forms/fields/AInputNumber.jsx";
import { useState } from "react";

const CreateAscesisSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_MESSAGE),
  started_at: Yup.date().required(REQUIRED_MESSAGE),
  days: Yup.number().integer().min(1).max(1000).required(REQUIRED_MESSAGE),
});

function CreateAscesisDialog({ visible, setVisible, ascesData, setAscesData }) {
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
      ascesAPI.create(values).then(response => {
        setAscesData([...ascesData, response.data]);
        setVisible(false);
        toast.current.show({
          severity: "success",
          summary: "Успешно",
          detail: "Аскеза успешно создана",
          life: 3000,
        });
      });
    },
  });

  return (
    <Dialog
      header="Создание Аскезы"
      visible={visible}
      onHide={() => setVisible(false)}>
      <form onSubmit={formik.handleSubmit}>
        <AInputText
          fieldName="name"
          label="Аскеза"
          formik={formik}
        />
        <ACalendar
          fieldName="started_at"
          label="Дата начала"
          formik={formik}
        />
        <AInputNumber
          fieldName="days"
          label="Кол-во дней"
          formik={formik}
        />
        <div className="flex justify-content-end">
          <Button
            label="Создать"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

CreateAscesisDialog.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  ascesData: PropTypes.array,
  setAscesData: PropTypes.func,
};

export default CreateAscesisDialog;
