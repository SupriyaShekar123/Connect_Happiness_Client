import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsDetails } from "../store/eventsDetails/actions";
import { selectEventsDetails } from "../store/eventsDetails/selectors";
import { selectToken } from "../store/user/selectors";
import { participents } from "../store/eventsDetails/actions";
import { selectUser } from "../store/user/selectors";

export default function EventsDetails() {
  const [messages, setMessage] = useState(
    "Please login or sign up to add to the event"
  );
  const userId = useSelector(selectUser);
  console.log("userId", userId.id);
  const token = useSelector(selectToken);
  console.log("token", token);
  const { id } = useParams();
  const eventDetails = useSelector(selectEventsDetails);
  console.log("eventsDetails", eventDetails.title);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getEventsDetails(id));
  }, [dispatch, id]);

  //   function message() {
  //     setMessage("ghghg");
  //   }

  function submit() {
    const datas = {
      eventId: id,
      userId: userId.id,
    };
    console.log("Please Sign up or login to join the event");
    if (token === null) {
      //alert("Please Signup if new User or Login if existing user to join.");
      history.push("/login");
    } else {
      dispatch(participents(datas));
      history.push("/ourServices");
    }
  }

  return (
    <div>
      <p>{eventDetails.title}</p>
      <p>{eventDetails.detail}</p>
      <button onClick={submit}>Join this event</button>
    </div>
  );
}
