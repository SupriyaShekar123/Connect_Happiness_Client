import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getShoppingDetails } from "../store/shoppingDetails/actions";
import { selectShoppingDetails } from "../store/shoppingDetails/selectors";

export default function ShoppingLisData() {
  const { id } = useParams();
  console.log("Params", id);
  const shoppingDetails = useSelector(selectShoppingDetails);
  console.log("Shopping Details", shoppingDetails.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {shoppingDetails.map((details) => {
        return (
          <div>
            <p>{details.category}</p>
            <p>{details.list}</p>

            <p>Name:{details.user.name}</p>
            <p>House_num:{details.user.house_num}</p>
            <p>Details:{details.user.street}</p>
            <p>Postcode:{details.user.postcode}</p>
            <p>City:{details.user.city}</p>
            <p>Phone:{details.user.phone}</p>
            <p>Email:{details.user.email}</p>
            <button>connect</button>
          </div>
        );
      })}
    </div>
  );
}
