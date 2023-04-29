import {API} from "../../api.js";
import {Link, useLoaderData } from "react-router-dom";
import { Button } from "primereact/button";
import AscesaCard from "../../components/cards/AscesaCard.jsx";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.jsx";


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

  return (
    <div className="layout-content">
      <Link to="create">
        <Button label="Создать Аскезу" to="create_ascesis"/>
      </Link>
      {asces}
    </div>
  );
}


export default ListAscesis;