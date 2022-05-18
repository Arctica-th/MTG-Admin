import {
  GET_IS_MOBILE_MODE,
  GET_GAME_SELECTED,
  GET_ALL_PRODUCT,
} from "../action/dataAction";

const initState = {
  mobileMode: false,
  gameSelected: null,
  allProduct: [],
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_IS_MOBILE_MODE:
      return {
        ...state,
        mobileMode: action.payload.mobileMode,
      };
    case GET_GAME_SELECTED:
      return {
        ...state,
        gameSelected: action.payload.gameSelected,
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        allProduct: action.payload.allProduct,
      };

    default:
      break;
  }

  return state;
};

export default dataReducer;
