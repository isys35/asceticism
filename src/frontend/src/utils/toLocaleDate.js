export function toLocaleDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleString("ru-RU", options);
}
