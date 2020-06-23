import axios from "axios";

// export async function getShoppingDetails(dispatch, getstate) {
//   dispatch({ type: "SHOPPINGDETAIL_LOADING" });
//   try {
//     const response = await axios.get("http://localhost:4000/shopping"); //http://localhost:4000/stream`

//     console.log("THE RESPONSE ", response.data);
//     dispatch({ type: "SHOPPINGDETAIL_LOADED", payload: response.data });
//   } catch (error) {
//     console.log(" ERROR MSG : ", error.message);
//     dispatch({ type: "SHOPPINGDETAIL_ERROR" });
//   }
// }

export const getShoppingDetails = (id) => {
  //console.log("email :", email, " Password :", password);
  return async (dispatch, getState) => {
    dispatch({ type: "SHOPPING_DETAIL_LOADING" });
    try {
      const response = await axios.get(`http://localhost:4000/shopping/${id}`);
      console.log("THE RESPONSE Shopping DETAILS", response.data);
      dispatch({ type: "SHOPPING_DETAIL_LOADED", payload: response.data });
    } catch (error) {
      dispatch({ type: "SHOPPING_DETAIL_ERROR" });
    }
  };
};
