export const GET_IS_MOBILE_MODE = "GET_IS_MOBILE_MODE";
export const GET_GAME_SELECTED = "GET_GAME_SELECTED";
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";

export const updateIsMobileMode = (data) => {
  return {
    type: GET_IS_MOBILE_MODE,
    payload: {
      mobileMode: data,
    },
  };
};

export const updateGameSelected = (data) => {
  return {
    type: GET_GAME_SELECTED,
    payload: {
      gameSelected: data,
    },
  };
};

export const updateAllProduct = (data) => {
  return {
    type: GET_ALL_PRODUCT,
    payload: {
      allProduct: data,
    },
  };
};
