import { Button } from "primereact/button";
import { PureAscesaCard } from "../../components/cards/AscesaCard.jsx";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.jsx";
import { Toolbar } from "primereact/toolbar";
import { useToday } from "../../hooks/useToday.jsx";
import CreateAscesisDialog from "./CreateAscesisDialog.jsx";
import { useEffect, useState } from "react";
import { ascesAPI } from "../../api/api.js";
import { useActivityAsceses } from "../../hooks/useActivityAsceses.jsx";
import { useActionAsceses } from "../../hooks/useActionAsceses.jsx";

function ListAscesis() {
  const today = useToday();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [addAscesButtonTitle, setAscesButtonTitle] = useState("");
  useBreadcrumbs([{ label: "Аскезы" }]);
  const [ascesData, setAscesData] = useState([]);
  const [completeAscesa, deleteAscesa] = useActionAsceses(
    ascesData,
    setAscesData,
  );
  const hasActiveAsceses = useActivityAsceses(ascesData);

  useEffect(() => {
    ascesAPI.list().then(response => setAscesData(response.data));
  }, []);

  useEffect(() => {
    !ascesData.length
      ? setAscesButtonTitle("Добавить аскезу")
      : setAscesButtonTitle("");
  }, [ascesData]);

  const asces = ascesData.map(ascesa_item => (
    <PureAscesaCard
      ascesa={ascesa_item}
      deleteAscesa={deleteAscesa}
      completeAscesa={completeAscesa}
      key={ascesa_item.id}
    />
  ));

  const toolbarAddAscesa = (
    <>
      <Button
        icon="pi pi-plus"
        label={addAscesButtonTitle}
        onClick={() => setVisibleDialog(true)}
      />
    </>
  );

  const toolbarCompleteAsces = hasActiveAsceses && (
    <Button
      icon="pi pi-check"
      label="Выполнить все"
    />
  );

  const ascesNotFound = (
    <div className="col text-center text-4xl">Нет актиных аскез</div>
  );

  return (
    <div className="layout-content">
      <div className="flex justify-content-between align-items-center">
        <h1>Аскезы</h1>
        <span className="today-date">{today}</span>
      </div>
      <Toolbar
        className="mb-8"
        start={toolbarCompleteAsces}
        end={toolbarAddAscesa}
      />
      <div className="grid">{asces.length ? asces : ascesNotFound}</div>
      <CreateAscesisDialog
        visible={visibleDialog}
        setVisible={setVisibleDialog}
        ascesData={ascesData}
        setAscesData={setAscesData}
      />
    </div>
  );
}

export default ListAscesis;
