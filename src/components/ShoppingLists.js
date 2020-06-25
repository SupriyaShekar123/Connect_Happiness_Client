import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopping } from "../store/shopping/actions";

import { selectUser } from "../store/user/selectors";
import { selectShoppingListId } from "../store/shopping/selectors";

export default function ShoppingLists() {
  const [category, setCategories] = useState({ shop: "groceries" });
  const [list, setList] = useState("");
  const user = useSelector(selectUser);

  const shoppingListsId = useSelector(selectShoppingListId);
  // console.log("ShoppingListId", shoppingListsId.id);

  // const id = shoppingListsId.id;
  // console.log("id", id);

  // console.log("user", user.id);
  const dispatch = useDispatch();

  function submit(event) {
    event.preventDefault();

    const lists = { category, list, userId: user.id };
    console.log("LISTS", lists);

    dispatch(shopping(lists));
    console.log("ShoppingListId", shoppingListsId.id);

    //dispatch(sendMail, id);
  }

  return (
    <div>
      <form>
        <label>Categories:</label>
        <select
          name='shop'
          value={category}
          onChange={(event) => setCategories(event.target.value)}>
          <option value='groceries'>groceries</option>
          <option value='medicines'>medicines</option>
        </select>
        <textarea
          value={list}
          onChange={(event) => setList(event.target.value)}>
          Hello
        </textarea>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}
