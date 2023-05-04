import {API} from "../../api.js";
import {Link, useLoaderData } from "react-router-dom";
import { Button } from "primereact/button";
import AscesaCard from "../../components/cards/AscesaCard.jsx";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.jsx";
import { Toolbar } from "primereact/toolbar";


export const ascesLoader = async () => {
  const response = await API.get("/asces");
  return response.data;
};


function ListAscesis() {
  const ascesData = useLoaderData();
  const asces = ascesData.map((ascesa_item, index) =>
    <AscesaCard ascesa={ascesa_item} key={index}/>
  );
  useBreadcrumbs([{ label: "Аскезы" }]);
  const toolbarAddAscesa = (
    <Link to="create">
      <Button icon="pi pi-plus" label="Добавить Аскезу" to="create_ascesis"/>
    </Link>
  );
  
  const getToday = () => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date().toLocaleString("ru-RU", options);
  };
  
  return (
    <div className="layout-content">
      <div className="flex justify-content-between align-items-center">
        <h1>Аскезы</h1>
        <span className="today-date">{getToday()}</span>
      </div>
      <Toolbar className="mb-5" start={toolbarAddAscesa} />
      <div className="grid">
        {asces}
      </div>
    </div>
  );
}


export default ListAscesis;