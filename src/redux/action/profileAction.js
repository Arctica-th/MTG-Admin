export const GET_PROFILE = "GET_PROFILE";

export const updateProfile = (data) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: data,
    },
  };
};
