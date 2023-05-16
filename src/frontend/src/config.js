export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AUTH_URL = BASE_URL + "/api/token";

const GITHUB_APP_ID = "c42ead5bc537447a0cd0";

export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&scope=read:user,user:email`;

export const BACK_GITHUB_OAUTH_URL = BASE_URL + "/api/oauth/github";

export const API_URL = BASE_URL + "/api/v1";

export const REQUIRED_MESSAGE = "Обязательное поле";

export const LOCALE = {
  closeText: "Закрыть",
  prevText: "Назад",
  nextText: "Вперёд",
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Воск", "Пон", "Вт", "Ср", "Четв", "Пят", "Суб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  weekHeader: "Неделя",
  FirstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "",
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
  allDayText: "Весь день",
};
