import { Link } from "react-router-dom";
import { Button } from "primereact/button";

function Home() {
  return (
    <div className="layout-main">
      <Link to="create-ascesis">
        <Button label="Создать Аскезу" to="create_ascesis"/>
      </Link>
    </div>
  );
}


export default Home;