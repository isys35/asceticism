import {isAuthenticated} from "../auth/auth.js";

function Home() {
  return (
    <div>{isAuthenticated() ? <p>Вход выполнен</p> : <p>Не выполнен</p>}
      <div>Домашняя страница</div>
    </div>
    
  );
}


export default Home;