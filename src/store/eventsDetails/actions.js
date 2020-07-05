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

export const getEventsDetails = (id) => {
  //console.log("email :", email, " Password :", password);
  return async (dispatch, getState) => {
    dispatch({ type: "EVENTSDETAILS_LOADING" });
    try {
      const response = await axios.get(`${apiUrl}/events/${id}`);
      console.log("THE RESPONSE  DETAILS", response.data);
      dispatch({ type: "EVENTSDETAILS_LOADED", payload: response.data });
    } catch (error) {
      dispatch({ type: "EVENTSDETAILS_ERROR" });
    }
  };
};

export function participents(datas) {
  //console.log(" participents ", datas);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    console.log("Token", token);

    try {
      const response = await axios.post(`${apiUrl}/participents`, datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "PARTICIPENTS_SUCCESS", payload: response.data });
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "You are added to the event successfully",
          3000
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("The error is ", error.message);
      }
    }
  };
}

export function removeUser(id) {
  //console.log(" participents ", datas);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.delete(`${apiUrl}/participents/${id}`);

      console.log("Remove Response ", response.data);
      dispatch({ type: "REMOVE_USER", payload: response.data });
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "You are removed from this  event. Hope to see you back soon.",
          2500
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("The error is ", error.message);
      }
    }
  };
}

export function createEvents(eventFormDetails) {
  console.log(" Create EVENTS .... ", eventFormDetails);

  const { title, detail, imageUrl, date, location, userId } = eventFormDetails;

  if (!title || !detail || !imageUrl || !date || !location || !userId) {
    console.log("SHOPPING VALIDATATION : ", eventFormDetails);

    return async (dispatch, getState) => {
      dispatch(setMessage("danger", true, "Fill the mandatoary fields"));
    };
  }
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    try {
      const response = await axios.post(`${apiUrl}/events`, eventFormDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "EVENTS_CREATE_SUCCESS", payload: response.data });

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your Post has submitted successfully",
          2500
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("The error is ", error.message);
      }
    }
  };
}
