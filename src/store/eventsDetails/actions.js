import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
  clearMessage,
} from "../appState/actions";

// export async function getEventsDetails(dispatch, getstate) {
//   dispatch({ type: "EVENTSDETAILS_LOADING" });
//   try {
//     const response = await axios.get("http://localhost:4000/events");
//     console.log("THE RESPONSE ", response.data);
//     dispatch({ type: "EVENTSDETAILS_LOADED", payload: response.data });
//   } catch (error) {
//     // console.log(" ERROR MSG : ", error.message)
//     dispatch({ type: "EVENTSDETAILS_ERROR" });
//   }
// }

export const getEventsDetails = (id) => {
  //console.log("email :", email, " Password :", password);
  return async (dispatch, getState) => {
    dispatch({ type: "EVENTSDETAILS_LOADING" });
    try {
      const response = await axios.get(`http://localhost:4000/events/${id}`);
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
    //const token = selectToken(getState());

    try {
      const response = await axios.post(
        "http://localhost:4000/participents",
        datas
      );

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "PARTICIPENTS_SUCCESS", payload: response.data });
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "You are added to the event successfully",
          2500
        )
      );
      //dispatch(setMessage("success", false, null));
      //dispatch({ type: "SUCESS_AUCTION", payload: response.data });
    } catch (error) {
      // console.log("AUCTUION ERROR MESSAGE message", error.response.data);
      // console.log("AUCTUION ERROR MESSAGE message", error.message);
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch(setMessage("danger", true, error.response.data));
      } else {
        console.log("The error is ", error.message);
        //dispatch(setMessage("danger", true, error.message));
      }
      //dispatch(appDoneLoading());
    }
  };
}

export function removeUser(id) {
  //console.log(" participents ", datas);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.delete(
        `http://localhost:4000/participents/${id}`
      );

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
      //dispatch(setMessage("success", false, null));
      //dispatch({ type: "SUCESS_AUCTION", payload: response.data });
    } catch (error) {
      // console.log("AUCTUION ERROR MESSAGE message", error.response.data);
      // console.log("AUCTUION ERROR MESSAGE message", error.message);
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch(setMessage("danger", true, error.response.data));
      } else {
        console.log("The error is ", error.message);
        //dispatch(setMessage("danger", true, error.message));
      }
      //dispatch(appDoneLoading());
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
    //const token = selectToken(getState());

    try {
      const response = await axios.post(
        "http://localhost:4000/events",
        eventFormDetails
      );

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "EVENTS_CREATE_SUCCESS", payload: response.data });

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your Request has submitted successfully",
          2500
        )
      );

      //dispatch(setMessage("success", false, null));
      //dispatch({ type: "SUCESS_AUCTION", payload: response.data });
    } catch (error) {
      // console.log("AUCTUION ERROR MESSAGE message", error.response.data);
      // console.log("AUCTUION ERROR MESSAGE message", error.message);
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch(setMessage("danger", true, error.response.data));
      } else {
        console.log("The error is ", error.message);
        //dispatch(setMessage("danger", true, error.message));
      }
      //dispatch(appDoneLoading());
    }
  };
}
