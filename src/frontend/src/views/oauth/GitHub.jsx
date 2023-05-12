import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function GitHub() {
  let [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("code"));
  }, []);

  return <div>Проверка подленности токена</div>;
}
