import { useLayoutEffect, useState } from "react";
import { toLocaleDate } from "../utils/toLocaleDate.js";

export function useToday() {
  const [today, setToday] = useState(null);
  useLayoutEffect(() => {
    setToday(toLocaleDate(new Date()));
  }, []);
  return today;
}
