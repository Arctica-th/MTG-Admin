import { mtgApi } from "../api/mtgAdmin";

export const searchGameCollection = async (name) => {
  const res = await mtgApi.get(`/game/${name}/20/,`);

  return res;
};
export const getGameCollectionByDate = async () => {
  const page = 1;
  const limit = 999;

  const res = await mtgApi.get(`/game/getAllByDate/${page}/${limit}`);

  return res;
};
export const getAllEditionByGame = async (gameMasterId) => {
  const data = {
    gameMaster: gameMasterId,
  };

  const res = await mtgApi.post(`/edition/getAllEditionByGame`, data);

  return res;
};
export const getEditionById = async (editionId) => {
  const res = await mtgApi.get(`/edition/getEditionById/${editionId}`);

  return res.data;
};

export const addGameCollection = async ({ name, description, imageURL }) => {
  const data = {
    name,
    description,
    imageURL,
  };
  const res = await mtgApi.post("/game/addNewGame", data);

  return res;
};

export const editGameCollection = async (id, name, description) => {
  const data = {
    id,
    name,
    description,
  };
  const res = await mtgApi.post("/game/editGameById", data);

  return res;
};

export const getGamgeMasterById = async (gId) => {
  const response = await mtgApi.get(`/game/getGameMasterById/${gId}`);

  return response;
};

export const advanceSearchGame = async (name) => {
  const data = {
    name,
  };

  const res = await mtgApi.post("/game/advSearchGame", name ? data : {});

  return res;
};

export const deleteGameById = async (id) => {
  const data = {
    id,
  };

  const res = await mtgApi.post("/game/delGameById", data);

  return res;
};

export const addGameEdition = async ({
  gameMaster,
  name,
  description,
  imageURL,
}) => {
  const data = {
    gameMaster,
    name,
    description,
    imageURL,
  };

  const res = await mtgApi.post("/edition/addNewEdition", data);

  return res;
};

export const searchGameEdition = async (name) => {
  // const res = await mtgApi.get(`/edition/${name}/20/,`);
  const res = await mtgApi.get(
    `/edition/getAllEdition/${name ? name : ","}/20/,`
  );

  return res;
};

export const editEditionCollection = async (data) => {
  const res = await mtgApi.post("/edition/editEdition", data);

  return res;
};
export const deleteEditionCollection = async (id) => {
  const data = {
    id,
  };
  const res = await mtgApi.post("/edition/delEdition", data);

  return res;
};

export const getTcgPlayerGameDetail = async (tcgId, gameEdition) => {
  //105554
  //62622eded4b22aa0d995e0e2
  const res = await mtgApi.get(`/card/tcgplayer/${tcgId}`);

  return res;
};

export const getCardScryfall = async (name, gameEdition) => {
  const res = await mtgApi.get(`/card/scryfall/${name}/${gameEdition}/`);

  return res;
};

export const postAdminConfirmStock = async (cardId, adminId, isConfirm) => {
  const data = {
    id: cardId,
    admin: adminId,
    isConfirm,
  };
  const res = await mtgApi.post(`/order/AconfirmOrderDetail`, data);

  return res;
};

export const postAdminConfirmDeliver = async (cardId, adminId, trackingNo) => {
  const data = {
    id: cardId,
    admin: adminId,
    trackingNo,
    isDeliver: true,
  };
  const res = await mtgApi.post(`/order/AconfirmDeliver`, data);

  return res;
};

export const postAinsufficientStock = async (cardId, adminId) => {
  const data = {
    id: cardId,
    admin: adminId,
    isInsufficient: true,
  };

  const res = await mtgApi.post(`/order/AinsufficientStock`, data);

  return res;
};

export const getGameMaster = async () => {
  const res = await mtgApi.get(`/game/getGamesMaster`);

  return res.data;
};
export const getConfigPricingById = async (gameMasterId) => {
  const res = await mtgApi.get(`/game/configPricing/${gameMasterId}`);

  return res.data;
};

export const postConfigPricing = async (data) => {
  const res = await mtgApi.post(`/game/configPricing`, data);

  return res;
};

export const getCustomPriceList = async () => {
  const res = await mtgApi.get(`/order/customPriceList`);
  return res.data;
};

export const postApproveCustomPrice = async (customPriceId, data) => {
  const res = await mtgApi.post(
    `/order/ApproveCustomPrice/${customPriceId}`,
    data
  );

  return res.data;
};

export const postReportTransaction = async (data) => {
  const res = await mtgApi.post(`/card/report/transaction`, data);
  return res.data;
};

export const postReportTransactionDownload = async (data) => {
  const res = await mtgApi.post(`/card/report/transaction/download`, data);
  return res.data;
};

export const getReportAllAdmin = async () => {
  const res = await mtgApi.get(`/card/report/allAdmin`);
  return res.data;
};
export const getReportAllAdminDownload = async () => {
  const res = await mtgApi.get(`/card/report/allAdmin/download`);
  return res.data;
};

export const postReportColor = async (data) => {
  const res = await mtgApi.post(`/card/report/color`, data);

  return res.data;
};

export const postReportRarity = async (data) => {
  const res = await mtgApi.post(`/card/report/rarity`, data);

  return res.data;
};

export const getListCardCreated = async (cardSerialId) => {
  const res = await mtgApi.get(
    `/card/listCardCreated?cardSerial=${cardSerialId}`
  );
  return res.data;
};

export const getAllCustomer = async () => {
  const url = `/user/getUsers`;

  const response = await mtgApi.post(url);

  return response.data;
};

export const getCustomerById = async (id) => {
  const url = `/user/getUsers`;

  const data = {
    _id: id,
  };

  const response = await mtgApi.post(url, data);

  return response.data;
};

export const getAddressById = async (id) => {
  const url = `/user/getAddress/${id}`;

  const response = await mtgApi.get(url);

  return response.data;
};
