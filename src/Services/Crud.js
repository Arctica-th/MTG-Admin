import { mtgApi } from "../api/mtgAdmin";

export const searchGameCollection = async (name) => {
  const res = await mtgApi.get(`/game/${name}/20/,`);

  return res;
};
export const getGameCollectionByDate = async () => {
  const res = await mtgApi.get("/game/getAllByDate");

  return res;
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
  const res = await mtgApi.get(`/edition/${name}/20/,`);

  return res;
};

export const editEditionCollection = async (id, name, description) => {
  const data = {
    id,
    name,
    description,
  };
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
  const res = await mtgApi.get(`/card/tcgplayer/${tcgId}/${gameEdition}`);

  return res;
};
