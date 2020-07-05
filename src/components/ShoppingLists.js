import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopping } from "../store/shopping/actions";

import {
  clearMessage,
  setMessage,
  showMessageWithTimeout,
} from "../store/appState/actions";
import { selectUser } from "../store/user/selectors";
import { selectShoppingListId } from "../store/shopping/selectors";
import { selectMessage } from "../store/appState/selectors";

export default function ShoppingLists() {
  const [category, setCategories] = useState("");
  const [list, setList] = useState("");
  const [requiredBy, setrequiredBy] = useState(0);
  const user = useSelector(selectUser);
  const history = useHistory();

  const shoppingListsId = useSelector(selectShoppingListId);
  const appSuccessMessage = useSelector(selectMessage);

  // console.log("THE VALUE SUCCESS MESSAGE : ", appSuccessMessage);

  const dispatch = useDispatch();
  const today1 = new Date();

  // this funciton is to sumbit the request from the senior citizen.
  function submit(event) {
    event.preventDefault();
    //dispatch(clearMessage());

    // this dispatch is used to clear the app state error message.

    const lists = { category, list, userId: user.id, requiredBy };
    // console.log("LISTS", lists, " Lenght : ", requiredBy);

    let datetime;
    if (requiredBy !== 0) {
      datetime =
        (new Date(requiredBy.split("T")[0]).getTime() - today1.getTime()) /
        (1000 * 3600 * 24);
      // console.log("Difference in Time", datetime);
    }

    // *****************
    if (!category || !list || requiredBy === 0 || !user.id) {
      dispatch(setMessage("danger", true, "Fill the mandatoary fields"));
    } else if (requiredBy === undefined || requiredBy === "") {
      dispatch(
        setMessage("danger", true, "Date Field is not filled correctly ")
      );
    } else if (
      // validation check for dates

      datetime < 2 ||
      datetime > 30
    ) {
      dispatch(
        setMessage(
          "danger",
          true,
          "Request  date start date should be  min 2 days and maximum 30 days to current date"
        )
      );
    } else {
      // this dispatch is used to send post data request to backend server
      dispatch(shopping(lists, history));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your Request has submitted successfully",
          2500
        )
      );
    }
  }

  // // this condition is to navigate to shopping details on successfully submission

  // if (appSuccessMessage != null && appSuccessMessage.dismissable === false) {
  //   history.push("/myrequest");
  //   //console.log("THIS CODE IS EXECUTED ");
  // }
  const today = new Date().toISOString().split(":");
  return (
    <div className='shopping_form'>
      <form>
        <div className='div_inner_req_form'>
          <div className='div_shooping_req_heading'>
            Provide Your Request information
          </div>

          <div className='div_req_left'>
            <label>Request Type</label>
          </div>
          <div className='div_req_right'>
            <input
              className='req_form'
              type='text'
              placeholder='Ex:shopping help,pet care '
              value={category}
              onChange={(event) => setCategories(event.target.value)}
            />
          </div>
          <div className='div_req_left'>
            <label>Detail</label>
          </div>
          <div className='div_req_right'>
            <textarea
              className='req_form'
              type='text'
              placeholder='Leave a small message on the help you need.'
              value={list}
              onChange={(event) => setList(event.target.value)}
            />
          </div>
          <div className='div_req_left'>
            <label>Required By</label>
          </div>
          <div className='div_req_right'>
            <input
              className='event_form_date_value'
              type='datetime-local'
              min={today[0] + ":" + today[1]}
              value={requiredBy}
              onChange={(event) => setrequiredBy(event.target.value)}
            />
          </div>
          <div className='div_req_form_btn'>
            {" "}
            <button onClick={submit}>Submit </button>
          </div>
        </div>
      </form>
    </div>
  );
}
