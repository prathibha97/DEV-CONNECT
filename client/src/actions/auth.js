import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register user

export const register = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
