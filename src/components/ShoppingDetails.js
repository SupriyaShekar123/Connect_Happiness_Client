import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingDetails } from "../store/shopping/actions";
import { selectShoppingLists } from "../store/shopping/selectors";
import Table from "react-bootstrap/Table";

export default function ShoppingDetails() {
  const shoppinglists = useSelector(selectShoppingLists);
  console.log("Shopping lists", shoppinglists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails);
  }, [dispatch]);

  return (
    <div className='div-padding'>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>category</th>
          <th>lists</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
        {shoppinglists.map((lists) => {
          return (
            <tr>
              <td>{lists.user.name}</td>
              <td>{lists.user.email}</td> <td>{lists.category}</td>
              <td>{lists.list}</td>
              <td>{lists.status}</td>
              <Link to={`/shoppingDetails/${lists.id}`}>
                {" "}
                <td>
                  {" "}
                  <button>View Details</button>{" "}
                </td>
              </Link>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
