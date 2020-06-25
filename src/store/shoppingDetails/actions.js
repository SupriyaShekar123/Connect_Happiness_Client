import axios from "axios";

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

export function updateShopping(id, update) {
  console.log(" updateShopping ", update, "Id is", id);
  return async (dispatch, getState) => {
    //const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `http://localhost:4000/shopping/${id}`,
        update
      );

      console.log("Auction  FORM  Response ", response.data);
      dispatch({ type: "UPDATE_SHOPPING", payload: response.data });
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
