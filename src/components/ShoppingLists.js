import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopping } from "../store/shopping/actions";

import { clearMessage } from "../store/appState/actions";
import { selectUser } from "../store/user/selectors";
import { selectShoppingListId } from "../store/shopping/selectors";
import { selectMessage } from "../store/appState/selectors";

export default function ShoppingLists() {
  const [category, setCategories] = useState("groceries");
  const [list, setList] = useState("");
  const [requiredBy, setrequiredBy] = useState(0);
  const user = useSelector(selectUser);
  const history = useHistory();

  const shoppingListsId = useSelector(selectShoppingListId);
  const appSuccessMessage = useSelector(selectMessage);

  // console.log("THE VALUE SUCCESS MESSAGE : ", appSuccessMessage);

  const dispatch = useDispatch();

  // this funciton is to sumbit the request from the senior citizen.
  function submit(event) {
    event.preventDefault();

    // this dispatch is used to clear the app state error message.
    dispatch(clearMessage());
    const lists = { category, list, userId: user.id, requiredBy };
    console.log("LISTS", lists);

    // this dispatch is used to send post data request to backend server
    dispatch(shopping(lists));
    console.log("ShoppingListId", shoppingListsId.id);
  }

  // // this condition is to navigate to shopping details on successfully submission

  if (appSuccessMessage != null && appSuccessMessage.dismissable === false) {
    history.push("/myrequest");
    console.log("THIS CODE IS EXECUTED ");
  }
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
              value={list}
              onChange={(event) => setList(event.target.value)}
            />
          </div>
          <div className='div_req_left'>
            <label>Date</label>
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
