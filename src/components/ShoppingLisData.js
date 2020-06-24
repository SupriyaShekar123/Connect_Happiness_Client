import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getShoppingDetails,
  updateShopping,
} from "../store/shoppingDetails/actions";
import { selectShoppingDetails } from "../store/shoppingDetails/selectors";
import { selectUser } from "../store/user/selectors";

export default function ShoppingLisData() {
  const { id } = useParams();
  console.log("Params", id);
  const shoppingDetails = useSelector(selectShoppingDetails);
  console.log("Shopping Details", shoppingDetails.user);
  const userId = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails(id));
  }, [dispatch, id]);

  function updateData() {
    console.log("closed");
    const update = {
      volunteerId: userId.id,
      status: "close",
    };
    dispatch(updateShopping(id, update));
    console.log("id", id);
  }

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
            <button onClick={updateData}>connect</button>
          </div>
        );
      })}
    </div>
  );
}
