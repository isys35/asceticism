import { Link } from "react-router-dom";
import { Button } from "primereact/button";
// import { API } from "../api.js";
// import AscesaCard from "../components/cards/AscesaCard.jsx";


// export const ascesLoader = async () => {
//   const response = await API.get("/asces");
//   return response.data;
// };




function Home() {
  // const ascesData = useLoaderData();
  // const asces = ascesData.map((ascesa_item, index) =>
  //   <AscesaCard ascesa={ascesa_item} key={index}/>
  // );
  return (
    <div className="layout-main">
      <h1 className="logo">ASCETICISM</h1>
      <div className="about-asceticism">
        <p>Методика достижения духовных целей через упражнения в самодисциплине, самоограничении, самоотвержении</p>
        <p>Аскеза — это добровольное ограничение себя в чем-то ради достижения определенной цели.</p>
        <p>Самоограничения можно вводить в самых разных областях. Ты можешь отказаться от обсценной лексики, если используешь ее постоянно, или перестать есть продукты, которые часто употребляешь — например, сахар или конфеты.  Подойдут и физические нагрузки — ежедневная зарядка или ежевечерний час йоги.</p>
        <p>Главное — не забывать, что аскеза — это упражнение на дисциплину.</p>
        <Link to="asces">
          <Button label="Мои аскезы" className="to-asces-btn"/>
        </Link>
      </div>
      {/*<Link to="create-ascesis">*/}
      {/*  <Button label="Создать Аскезу" to="create_ascesis"/>*/}
      {/*</Link>*/}
      {/*{asces}*/}
    </div>
  );
}


export default Home;