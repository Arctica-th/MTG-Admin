import { GET_PROFILE } from "../action/profileAction";

const initState = {
  profile: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };

    default:
      break;
  }

  return state;
};

export default profileReducer;
