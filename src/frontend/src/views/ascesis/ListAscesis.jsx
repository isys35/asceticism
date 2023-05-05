import {API} from "../../api.js";
import { useLoaderData } from "react-router-dom";
import { Button } from "primereact/button";
import AscesaCard from "../../components/cards/AscesaCard.jsx";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.jsx";
import { Toolbar } from "primereact/toolbar";
import { useToday } from "../../hooks/useToday.jsx";
import CreateAscesisDialog from "./CreateAscesisDialog.jsx";
import {useState} from "react";


export const ascesLoader = async () => {
  const response = await API.get("/asces");
  return response.data;
};


function ListAscesis() {
  const ascesData = useLoaderData();
  const today = useToday();
  const [visibleDialog, setVisibleDialog] = useState(false);
  useBreadcrumbs([{ label: "Аскезы" }]);
  const toolbarAddAscesa = (
    <>
      <Button icon="pi pi-plus" label="Добавить Аскезу" onClick={()=> setVisibleDialog(true)}/>
    </>
  );
  const asces = ascesData.map((ascesa_item, index) =>
    <AscesaCard ascesa={ascesa_item} key={index}/>
  );

  
  return (
    <div className="layout-content">
      <div className="flex justify-content-between align-items-center">
        <h1>Аскезы</h1>
        <span className="today-date">{today}</span>
      </div>
      <Toolbar className="mb-5" start={toolbarAddAscesa} />
      <div className="grid">
        {asces}
      </div>
      <CreateAscesisDialog visible={visibleDialog} setVisible={setVisibleDialog} />
    </div>
  );
}


export default ListAscesis;