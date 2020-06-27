import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingDetails } from "../store/shopping/actions";
import { selectShoppingLists } from "../store/shopping/selectors";
import { selectUser } from "../store/user/selectors";

export default function ShoppingDetails() {
  const shoppinglists = useSelector(selectShoppingLists);
  console.log("Shopping lists", shoppinglists);
  const dispatch = useDispatch();
  const seniorCitizens = useSelector(selectUser);
  console.log("seniorCitizen", seniorCitizens.roles);
  const roles = seniorCitizens.roles;
  console.log("roles", roles);
  //const history = useHistory();

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
          <th>RequiredBy</th>
          <th>Status</th>

          <th>Details</th>
        </tr>
        {shoppinglists.map((lists) => {
          return (
            <tr>
              <td>{lists.user.name}</td>
              <td>{lists.user.email}</td> <td>{lists.category}</td>
              <td>{lists.list}</td>
              <td>
                {" "}
                {new Intl.DateTimeFormat("en-FB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                }).format(Date.parse(lists.requiredBy))}{" "}
              </td>
              <td>{lists.status}</td>
              {roles !== "seniorCitizen" ? (
                <Link to={`/shoppingDetails/${lists.id}`}>
                  {" "}
                  <td>
                    {" "}
                    <button>View Details</button>{" "}
                  </td>
                </Link>
              ) : (
                <td>Updated</td>
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
