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
