import {Link, useLoaderData} from "react-router-dom";
import { Button } from "primereact/button";
import {API} from "../api.js";
import AscesaCard from "../components/cards/ascesa.jsx";


export const ascesLoader = async () => {
  const response = await API.get("/asces");
  return response.data;
};




function Home() {
  const ascesData = useLoaderData();
  const asces = ascesData.map((ascesa_item, index) =>
    <AscesaCard ascesa={ascesa_item} key={index}/>
  );
  return (
    <div className="layout-main">
      <Link to="create-ascesis">
        <Button label="Создать Аскезу" to="create_ascesis"/>
      </Link>
      {asces}
    </div>
  );
}


export default Home;