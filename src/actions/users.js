import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = data => dispatch =>
  api.user.signup(data).then(result => {
    localStorage.gottatcgJWT = result.user.token;
    if (data.image) {
      api.user.UploadUserImage(data.image, result._id);
    }
    dispatch(userLoggedIn(result.user));
  });


export const edit = data => dispatch =>
  api.user.Edit(data).then(result => {
    localStorage.gottatcgJWT = result.user.token;
    dispatch(userLoggedIn(result.user));
  })