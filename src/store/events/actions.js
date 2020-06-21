import axios from "axios";

export async function getEventsLists(dispatch, getstate) {
  dispatch({ type: "EVENTS_LOADING" });
  try {
    const response = await axios.get("http://localhost:4000/events"); //http://localhost:4000/stream`

    console.log("THE RESPONSE ", response.data);
    dispatch({ type: "EVENTS_LOADED", payload: response.data });
  } catch (error) {
    console.log(" ERROR MSG : ", error.message);
    dispatch({ type: "EVENTS_ERROR" });
  }
}

export function shopping(lists) {
  console.log(" ShoppingLists ", lists);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.post(
        "http://localhost:4000/shopping",
        lists
      );

      //console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "LISTS_SUCCESS", payload: response.data });
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
