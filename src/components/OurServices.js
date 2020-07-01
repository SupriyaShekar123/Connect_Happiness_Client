import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsLists } from "../store/events/actions";
import { selectEventsLists } from "../store/events/selectors";

export default function OurServices() {
  const eventLists = useSelector(selectEventsLists);
  const dispatch = useDispatch();
  // console.log("EventsList", eventLists);

  useEffect(() => {
    dispatch(getEventsLists);
  }, [dispatch]);

  return (
    <div className='div_ourservices'>
      {eventLists.map((events) => {
        return (
          <div className='div_inner_details'>
            <Link to={`/events/${events.id}`}>
              <div className='event_title'>{events.title}</div>
              <div className='div_ourservice_image'>
                <img src={events.imageUrl} />
              </div>
            </Link>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}
