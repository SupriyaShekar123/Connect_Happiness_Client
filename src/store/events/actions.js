import { apiUrl } from "../../config/constants";
import axios from "axios";

export async function getEventsLists(dispatch, getstate) {
  dispatch({ type: "EVENTS_LOADING" });
  try {
    const response = await axios.get(`${apiUrl}/events`); //http://localhost:4000/stream`

    console.log("THE RESPONSE ", response.data);
    dispatch({ type: "EVENTS_LOADED", payload: response.data });
  } catch (error) {
    console.log(" ERROR MSG : ", error.message);
    dispatch({ type: "EVENTS_ERROR" });
  }
}
