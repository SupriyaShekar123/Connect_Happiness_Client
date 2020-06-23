import axios from "axios";

export async function getShoppingDetails(dispatch, getstate) {
  dispatch({ type: "SHOPPINGDETAILS_LOADING" });
  try {
    const response = await axios.get("http://localhost:4000/shopping"); //http://localhost:4000/stream`

    console.log("THE RESPONSE ", response.data);
    dispatch({ type: "SHOPPINGDETAILS_LOADED", payload: response.data });
  } catch (error) {
    console.log(" ERROR MSG : ", error.message);
    dispatch({ type: "SHOPPINGDETAILS_ERROR" });
  }
}
