import api from "../utils/api";
import { setAlert } from "./alert";

import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "./types";

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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const response = await api.get("/profile");
    dispatch({
      type: GET_PROFILES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/profile/users/${userId}`);
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

// Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const response = await api.get(`/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
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

// Add experience

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.put("/profile/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience added", "success"));

    navigate("/dashboard");
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

// Add experience

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.put("/profile/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Education added", "success"));

    navigate("/dashboard");
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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this account?")) {
    try {
      await api.delete(`/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });
      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
