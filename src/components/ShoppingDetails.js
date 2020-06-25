import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingDetails } from "../store/shopping/actions";
import { selectShoppingLists } from "../store/shopping/selectors";

export default function ShoppingDetails() {
  const shoppinglists = useSelector(selectShoppingLists);
  console.log("Shopping lists", shoppinglists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails);
  }, [dispatch]);

  return (
    <div>
      {shoppinglists.map((lists) => {
        return (
          <div>
            <p>Name:{lists.user.name}</p>
            <p>Email:{lists.user.email}</p>
            <p>{lists.category}</p>
            <p>Items:{lists.list}</p>
            <Link to={`/shoppingDetails/${lists.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
