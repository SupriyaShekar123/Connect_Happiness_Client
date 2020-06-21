import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shopping } from "../store/events/actions";

export default function ShoppingLists() {
  const [category, setCategories] = useState({ shop: "groceries" });
  const [list, setList] = useState("");
  const dispatch = useDispatch();

  function submit(event) {
    event.preventDefault();

    const lists = { category, list, userId: 1 };
    console.log("LISTS", lists);

    dispatch(shopping(lists));
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
