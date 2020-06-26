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
    // <Table striped bordered hover size='sm'>
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>1</td>
    //       <td>Mark</td>
    //       <td>Otto</td>
    //       <td>@mdo</td>
    //     </tr>
    //     <tr>
    //       <td>2</td>
    //       <td>Jacob</td>
    //       <td>Thornton</td>
    //       <td>@fat</td>
    //     </tr>
    //     <tr>
    //       <td>3</td>
    //       <td colSpan='2'>Larry the Bird</td>
    //       <td>@twitter</td>
    //     </tr>
    //   </tbody>
    // </Table>
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
