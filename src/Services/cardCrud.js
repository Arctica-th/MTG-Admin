import { mtgApi } from "../api/mtgAdmin";

export const addNewCard = async (data) => {
  const res = await mtgApi.post(`/card/addNewCard`, data);

  return res;
};

export const getAllCardByName = async (name) => {
  const res = await mtgApi.get(`/card/getAllByName/${name}/20/,`);

  return res;
};

export const removeProduct = async (id) => {
  const data = {
    id: id,
  };

  const res = await mtgApi.post(`/product/removeProduct`, data);

  return res.data;
};

export const deleteCard = async (cardSerial) => {
  const res = await mtgApi.delete(`/card/${cardSerial}`);

  return res.data;
};

export const addProduct = async (data) => {
  const res = await mtgApi.post(`/product/addProduct`, data);

  return res.data;
};

export const addStock = async (data) => {
  const res = await mtgApi.post(`/card/addStock`, data);

  return res.data;
};
export const reduceStock = async (data) => {
  const res = await mtgApi.post(`/card/reduceStock`, data);

  return res.data;
};

export const getCardDetail = async (cardId) => {
  const res = await mtgApi.get(`/card/getCardDetail/${cardId}`);

  return res.data;
};
