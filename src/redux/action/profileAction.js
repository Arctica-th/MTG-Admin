export const GET_PROFILE = "GET_PROFILE";
export const GET_TOKEN = "GET_TOKEN";

export const updateProfile = (data) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: data,
    },
  };
};

export const updateToken = (data) => {
  localStorage.setItem("token", data);
  return {
    type: GET_TOKEN,
    payload: {
      token: data,
    },
  };
};
