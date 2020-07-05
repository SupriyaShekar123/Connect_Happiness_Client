import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
  clearMessage,
} from "../appState/actions";

export const getShoppingDetails = (id) => {
  //console.log("email :", email, " Password :", password);
  return async (dispatch, getState) => {
    dispatch({ type: "SHOPPING_DETAIL_LOADING" });
    try {
      const response = await axios.get(`${apiUrl}/shopping/${id}`);
      console.log("THE RESPONSE Shopping DETAILS", response.data);
      dispatch({ type: "SHOPPING_DETAIL_LOADED", payload: response.data });
    } catch (error) {
      dispatch({ type: "SHOPPING_DETAIL_ERROR" });
    }
  };
};

export function updateShopping(id, update, emailDetials) {
  // console.log(" UPDATE SHOPPING : ", update, "Id is", id);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.patch(`${apiUrl}/shopping/${id}`, update);

      console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "UPDATE_SHOPPING", payload: response.data });
      dispatch(confirmMail(emailDetials));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your message was sent. Thank you.",
          3500
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch(setMessage("danger", true, error.response.data));
      } else {
        console.log("The error is ", error.message);
        //dispatch(setMessage("danger", true, error.message));
      }
    }
  };
}

export const getUserRequestDetails = (id) => {
  console.log("USER ID FOR SHOPPEING ", id);
  return async (dispatch, getState) => {
    dispatch({ type: "SHOPPING_DETAIL_LOADING" });
    try {
      const response = await axios.get(`${apiUrl}/user/${id}`);
      console.log("THE RESPONSE USER REQUEST DETAILS", response.data);
      dispatch({ type: "SHOPPING_DETAIL_LOADED", payload: response.data });
    } catch (error) {
      dispatch({ type: "SHOPPING_DETAIL_ERROR" });
    }
  };
};

export function confirmMail(emailDetials) {
  console.log(" SEND EMAIL ", emailDetials);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.post(`${apiUrl}/confirm`, emailDetials);

      dispatch({ type: "CONFIRM_MAIL", payload: response.data });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("The error is ", error.message);
      }
    }
  };
}
