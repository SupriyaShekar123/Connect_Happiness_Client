import { getUserRequestDetails } from "../store/shoppingDetails/actions";
import { selectShoppingDetails } from "../store/shoppingDetails/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

export default function ShoppingDetails() {
  const shoppinglists = useSelector(selectShoppingDetails);
  //   console.log("Shopping lists", shoppinglists);
  const dispatch = useDispatch();
  const seniorCitizens = useSelector(selectUser);
  const id = seniorCitizens.id;

  useEffect(() => {
    dispatch(getUserRequestDetails(id));
  }, [dispatch, id]);

  if (!shoppinglists) {
    return <div>loading...</div>;
  }

  return (
    <div className='div_shoppingdetails_main_div'>
      <div className='div_shooping_req_heading'>My Requests</div>

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
          const requestList = lists.shoppinglists.map((shopping) => {
            return (
              <tr key={shopping.id}>
                <td>{lists.name}</td>
                <td>
                  {lists.house_num} , {lists.street} ,{lists.postcode},{" "}
                  {lists.city}
                </td>
                <td>{shopping.category}</td>
                <td>{shopping.list}</td>

                <td>
                  {new Intl.DateTimeFormat("en-FB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(Date.parse(shopping.requiredBy))}{" "}
                </td>
                <td>{shopping.status}</td>
              </tr>
            );
          });
          return requestList;
        })}
      </table>
    </div>
  );
}
