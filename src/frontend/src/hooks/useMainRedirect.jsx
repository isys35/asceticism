import { useNavigate } from "react-router";

export default function useMainRedirect() {
  let navigate = useNavigate();
  const redirect = () => {
    const homepage_viewed = JSON.parse(localStorage.getItem("homepage_viewed"));
    if (homepage_viewed) {
      return navigate("/asces");
    } else {
      return navigate("/");
    }
  };
  return redirect;
}
