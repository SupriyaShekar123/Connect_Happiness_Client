import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingDetails } from "../store/shopping/actions";

export default function ShoppingDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails);
  }, [dispatch]);

  return <div></div>;
}
