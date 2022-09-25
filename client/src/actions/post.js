import api from "../utils/api";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.get("/posts");
    dispatch({
      type: GET_POSTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
