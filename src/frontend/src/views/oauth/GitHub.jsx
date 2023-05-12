import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { githubOAuth, setJwtData } from "../../auth/auth.js";
import { useNavigate } from "react-router";

export function GitHub() {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();

  useEffect(() => {
    githubOAuth(searchParams.get("code")).then(result => {
      if ("access_token" in result) {
        setJwtData(result);
        return navigate("/");
      }
    });
  }, []);

  return <div>Проверка подленности токена</div>;
}
