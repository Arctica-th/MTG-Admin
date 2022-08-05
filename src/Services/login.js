import { loginAPI } from "../api/loginAPI";

export const postLogin = async (data) => {
  //   const data = {
  //     username: "string",
  //     password: "string",
  //   };

  const res = await loginAPI.post(`/admin/login`, data);
  return res.data;
};

export const postAddAdmin = async (data) => {
  // const data = {
  //   username: "narut",
  //   password: "narut",
  //   firstName: "Narut",
  //   lastName: "S",
  //   image: "string",
  //   email: "test@test.com",
  //   role: "admin",
  // };

  const res = await loginAPI.post(`/admin/addAdmin`, data);
  return res.data;
};
