import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsDetails } from "../store/eventsDetails/actions";
import { selectEventsDetails } from "../store/eventsDetails/selectors";

export default function EventsDetails() {
  const [messages, setMessage] = useState("");
  const { id } = useParams();
  const eventDetails = useSelector(selectEventsDetails);
  console.log("eventsDetails", eventDetails.title);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsDetails(id));
  }, [dispatch, id]);

  //   function message() {
  //     setMessage("ghghg");
  //   }

  return (
    <div>
      <p>{eventDetails.title}</p>
      <p>{eventDetails.detail}</p>
      <button>Join this event</button>
    </div>
  );
}
