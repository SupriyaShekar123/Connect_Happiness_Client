import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getShoppingDetails,
  updateShopping,
} from "../store/shoppingDetails/actions";
import { selectShoppingDetails } from "../store/shoppingDetails/selectors";
import { selectUser } from "../store/user/selectors";
import { clearMessage } from "../store/appState/actions";
//import EventsDetails from "./EventsDetails";

export default function ShoppingLisData() {
  //const [message, setMessage] = useState(false);
  const { id } = useParams();
  console.log("Params", id);
  const shoppingDetails = useSelector(selectShoppingDetails);
  console.log("Shopping Details...", shoppingDetails);
  const userId = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingDetails(id));
  }, [dispatch, id]);

  function updateData() {
    dispatch(clearMessage());
    console.log("closed");
    const update = {
      volunteerId: userId.id,
      status: "close",
    };
    dispatch(updateShopping(id, update));
    console.log("id", id);
  }

  return (
    <div className='div_shoppingDetails'>
      {!shoppingDetails ? (
        <div>loading ...</div>
      ) : (
        <div className='div_border'>
          {shoppingDetails.map((details) => {
            console.log("shoppingDetails>>>>>", details.user);
            return (
              <div className='div_shopping_details_values' key={details.id}>
                <div className='div_left'>
                  <p className='p_shopping_details_values_left'>
                    <b>RequestedBy</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>: {details.user.name}</p>
                </div>
                <div className='div_left'>
                  <p>
                    <b>Request Type</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>{details.category}</p>
                </div>

                <div className='div_left'>
                  <p>
                    <b>Request Details</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>: {details.list}</p>
                </div>

                <div className='div_left'>
                  <p className='p_shopping_details_values_left'>
                    <b>Address</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>
                    : {details.user.house_num} , {details.user.street} ,
                    {details.user.postcode},{details.user.city}
                  </p>
                </div>

                <div className='div_left'>
                  <p>
                    <b>Phone</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>: {details.user.phone}</p>
                </div>
                <div className='div_left'>
                  <p>
                    <b>Email</b>
                  </p>
                </div>
                <div className='div_right'>
                  <p>: {details.user.email}</p>
                </div>
              </div>
            );
          })}
          <div>
            {shoppingDetails.map((details) => {
              if (details.status !== "close") {
                return (
                  <div>
                    <Link to='/message'>
                      <button className='btn_shopping_detils_connect'>
                        {/* // onClick={updateData}> */}
                        Send Message
                      </button>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
