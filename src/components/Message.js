import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateShopping } from "../store/shoppingDetails/actions";
import { selectUser } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";

import { selectShoppingDetails } from "../store/shoppingDetails/selectors";

export default function Message() {
  const history = useHistory();

  const [uemailMsg, setEmail] = useState("");
  const dispatch = useDispatch();
  const shoppingDetails = useSelector(selectShoppingDetails);
  console.log("MESAGE :", shoppingDetails);

  useEffect(() => {
    if (userId.length > 0) {
      const emailMsg =
        "Dear " +
        userId[0].user.name +
        ",\n" +
        "I'm willing to help you please send me an email or call me to setup an appointment. \n\n" +
        "My Contact details \n" +
        "phone: " +
        volUserId.phone +
        "\n" +
        "Email : " +
        volUserId.email +
        "\n\nRegards,\n" +
        volUserId.name +
        "\n";

      setEmail(emailMsg);
    }
  }, []);

  const volUserId = useSelector(selectUser);

  const userId = shoppingDetails.map((user) => {
    return user;
  });

  function updateData(event) {
    event.preventDefault();

    let update;
    if (userId.length > 0) {
      update = {
        volunteerId: volUserId.id,
        status: "close",
      };

      let emailDetails = {
        email: uemailMsg,
        to: userId[0].user.email,
        volEmail: volUserId.email,
        volPhone: volUserId.phone,
      };

      console.log(
        "UPDATE REQE :",
        update,
        "voluneter :",
        volUserId.id,
        "Email Details ",
        emailDetails
      );
      dispatch(updateShopping(userId[0].id, update, emailDetails, history));
      //history.push("/shoppingDetails");
    }
  }
  return (
    <div className='div_message_main'>
      <div className='div_message_border'>
        <div class='div_shooping_req_heading'>confirm by sending message</div>
        <form>
          <textarea
            type='text'
            //   placeholder={email}
            defaultValue={uemailMsg}
            onBlur={(event) => setEmail(event.target.value)}
          />
          <div className='btn_shopping_detils_send'>
            <button onClick={updateData}>send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
