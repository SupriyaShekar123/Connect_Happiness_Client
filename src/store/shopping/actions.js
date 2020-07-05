import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
  clearMessage,
} from "../appState/actions";

export async function getShoppingDetails(dispatch, getstate) {
  dispatch({ type: "SHOPPINGDETAILS_LOADING" });
  try {
    const response = await axios.get(`${apiUrl}/shopping`);

    console.log("THE RESPONSE ", response.data);
    dispatch({ type: "SHOPPINGDETAILS_LOADED", payload: response.data });
  } catch (error) {
    console.log(" ERROR MSG : ", error.message);
    dispatch({ type: "SHOPPINGDETAILS_ERROR" });
  }
}

export function shopping(lists, history) {
  // console.log(" ShoppingLists ", lists);
  const { category, list, userId, requiredBy } = lists;

  if (!category || !list || !userId || !requiredBy) {
    return async (dispatch, getState) => {
      dispatch(setMessage("danger", true, "Fill the mandatoary fields"));
    };
  }
  return async (dispatch, getState) => {
    //dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.post(`${apiUrl}/shopping`, lists, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "LISTS_SUCCESS", payload: response.data });

      const shoppingID = { spid: response.data.id };
      dispatch(sendMail(shoppingID));

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your Request has submitted successfully",
          2500
        )
      );

      //dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data));
      } else {
        console.log("The error is ", error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
}

export function sendMail(id) {
  console.log(" SendMail ", id);
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/send`, id);

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "SENT_MAIL", payload: response.data });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);

        console.log("The error is ", error.message);
      }
    }
  };
}
