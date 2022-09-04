import { GET_PROFILE, GET_TOKEN } from "../action/profileAction";

const initState = {
  profile: {},
  token: "",
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      break;
  }

  return state;
};

export default profileReducer;
