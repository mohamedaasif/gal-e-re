export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const BASE_URL = "http://localhost:3001/api";

export const userid = localStorage.getItem("userid");
export const token = localStorage.getItem("token");

export const removeToken = () => localStorage.clear();
