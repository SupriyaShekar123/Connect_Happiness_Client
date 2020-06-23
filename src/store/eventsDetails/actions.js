import axios from "axios";

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
  console.log(" participents ", datas);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.post(
        "http://localhost:4000/participents",
        datas
      );

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "PARTICIPENTS_SUCCESS", payload: response.data });
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
