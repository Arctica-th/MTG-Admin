import axios from "axios";

export const storeApi = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fakeOrder = [
  {
    orderNumber: "11111",
    status: {
      statusDetail: "Completed",
      statusId: 1,
    },
  },
  {
    orderNumber: "22222",
    status: {
      statusDetail: "Pending Transfer",
      statusId: 2,
    },
  },
  {
    orderNumber: "33333",
    status: {
      statusDetail: "Completed",
      statusId: 1,
    },
  },
];
