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

  if (!shoppinglists) {
    return <div>loading...</div>;
  }

  return (
    <div className='div_shoppingdetails_main_div'>
      <div className='div_shooping_req_heading'>
        Open Requests Which Needs Help{" "}
      </div>
      <div>
        {" "}
        ** click on the name column to see more information of the requestor{" "}
      </div>
      <table className='request_table'>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Request Type</th>
          <th>Request Details</th>
          <th>Request End date</th>
          <th>Status</th>

          {/* <th>Details</th> */}
        </tr>
        {shoppinglists.map((lists) => {
          return (
            <tr key={lists.id}>
              <td>
                <Link to={`/shoppingDetails/${lists.id}`}>
                  {lists.user.name}
                </Link>
              </td>

              <td>
                {lists.user.house_num} , {lists.user.street} ,
                {lists.user.postcode}, {lists.user.city}
              </td>
              <td>{lists.category}</td>
              <td>{lists.list}</td>

              <td>
                {new Intl.DateTimeFormat("en-FB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  // hour: "numeric",
                  // minute: "numeric",
                }).format(Date.parse(lists.requiredBy))}{" "}
              </td>
              <td>{lists.status}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
