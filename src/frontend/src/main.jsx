import React from "react";
import ReactDOM from "react-dom/client";
import { locale, addLocale } from "primereact/api";

// locale
addLocale("ru", {
  closeText: "Закрыть",
  prevText: "Назад",
  nextText: "Вперёд",
  monthNames: ["Январь", "Февраль" , "Март" , "Апрель" , "Май" , "Июнь" , "Июль" , "Август" , "Сентябрь","Октябрь","Ноябрь","Декабрь" ],
  monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
  dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  dayNamesShort: ["Воск","Пон" , "Вт" , "Ср" , "Четв" , "Пят" , "Суб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  weekHeader: "Неделя",
  FirstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix:"",
  timeOnlyTitle: "Только время",
  timeText: "Время",
  hourText: "Час",
  minuteText: "Минута",
  secondText: "Секунда",
  currentText: "Сегодня",
  ampm: false,
  month: "Месяц",
  week: "неделя",
  day: "День",
  allDayText: "Весь день"
});

locale("ru");

//theme
import "primereact/resources/themes/viva-dark/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

//icons
import "primeicons/primeicons.css";
import AppRoutes from "./router/Routes.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
