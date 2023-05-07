import { useLayoutEffect, useState } from "react";

export function useToday() {
  const [today, setToday] = useState(null);
  useLayoutEffect(() => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    setToday(new Date().toLocaleString("ru-RU", options));
  }, []);
  return today;
}
