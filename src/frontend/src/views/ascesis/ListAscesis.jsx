import { Button } from "primereact/button";
import { PureAscesaCard } from "../../components/cards/AscesaCard.jsx";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.jsx";
import { Toolbar } from "primereact/toolbar";
import { useToday } from "../../hooks/useToday.jsx";
import CreateAscesisDialog from "./CreateAscesisDialog.jsx";
import { useEffect, useState } from "react";
import { ascesAPI } from "../../api/api.js";

function ListAscesis() {
  const today = useToday();
  const [visibleDialog, setVisibleDialog] = useState(false);
  useBreadcrumbs([{ label: "Аскезы" }]);
  const [ascesData, setAscesData] = useState([]);
  const toolbarAddAscesa = (
    <>
      <Button
        icon="pi pi-plus"
        label="Добавить Аскезу"
        onClick={() => setVisibleDialog(true)}
      />
    </>
  );

  useEffect(() => {
    ascesAPI.list().then(response => setAscesData(response.data));
  }, []);

  const asces = ascesData.map((ascesa_item, index) => (
    <PureAscesaCard
      ascesa={ascesa_item}
      key={index}
    />
  ));

  return (
    <div className="layout-content">
      <div className="flex justify-content-between align-items-center">
        <h1>Аскезы</h1>
        <span className="today-date">{today}</span>
      </div>
      <Toolbar
        className="mb-5"
        start={toolbarAddAscesa}
      />
      <div className="grid">{asces}</div>
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
