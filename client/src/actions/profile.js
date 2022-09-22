import api from "../utils/api";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await api.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
