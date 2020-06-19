import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsLists } from "../store/events/actions";
import { selectEventsLists } from "../store/events/selectors";

export default function OurServices() {
  const eventLists = useSelector(selectEventsLists);
  console.log("EventsList", eventLists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsLists);
  }, [dispatch]);

  return (
    <div>
      {eventLists.map((events) => {
        return (
          <div>
            <p>{events.title}</p>
            <img src={events.imageUrl} />
            <p>{events.detail}</p>
            <Link to={`/events/${events.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
