import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
//export const USER_REQUESTS = "USER_REQUESTS";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (singupdata) => {
  console.log("Dispatch data ", singupdata);

  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, singupdata);

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  console.log("email :", email, " Password :", password);
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        // console.log("error message sigup", error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// export function getUserRequestDetails(id) {
//   //console.log(" SendMail ", id);
//   return async (dispatch, getState) => {
//     //const token = selectToken(getState());

//     try {
//       const response = await axios.get(`http://localhost:4000/user/${id}`);

//       console.log(" User Response ", response.data);
//       dispatch({ type: USER_REQUESTS, payload: response.data });
//       //dispatch(setMessage("success", false, null));
//       //dispatch({ type: "SUCESS_AUCTION", payload: response.data });
//     } catch (error) {
//       // console.log("AUCTUION ERROR MESSAGE message", error.response.data);
//       // console.log("AUCTUION ERROR MESSAGE message", error.message);
//       if (error.response) {
//         console.log(error.response.data);
//         //dispatch(setMessage("danger", true, error.response.data));
//       } else {
//         console.log("The error is ", error.message);
//         //dispatch(setMessage("danger", true, error.message));
//       }
//       //dispatch(appDoneLoading());
//     }
//   };
// }

// export const getUserRequestDetails = (id) => {
//   //console.log("email :", email, " Password :", password);
//   return async (dispatch, getState) => {
//     //dispatch({ type: "SHOPPING_DETAIL_LOADING" });
//     try {
//       const response = await axios.get(`http://localhost:4000/user/${id}`);
//       console.log("THE RESPONSE USER REQUEST DETAILS", response.data);
//       dispatch({ type: "USER_REQUESTS", payload: response.data });
//     } catch (error) {
//       //dispatch({ type: "SHOPPING_DETAIL_ERROR" });
//     }
//   };
// };
