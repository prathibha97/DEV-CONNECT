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

// Create or update a profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const response = await api.post("/profile", formData);
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
      dispatch(
        setAlert(edit ? "profile updated" : "Profile Created", "success")
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      // validation errors
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
