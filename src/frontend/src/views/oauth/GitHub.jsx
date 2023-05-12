import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { githubOAuth, setJwtData } from "../../auth/auth.js";
import useMainRedirect from "../../hooks/useMainRedirect.jsx";
import { ProgressBar } from "primereact/progressbar";

export function GitHub() {
  let [searchParams] = useSearchParams();
  const redirect = useMainRedirect();

  useEffect(() => {
    githubOAuth(searchParams.get("code")).then(result => {
      if ("access_token" in result) {
        setJwtData(result);
        redirect();
      }
    });
  }, []);

  return (
    <ProgressBar
      mode="indeterminate"
      style={{ height: "6px" }}></ProgressBar>
  );
}
