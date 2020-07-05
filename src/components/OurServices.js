import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsLists } from "../store/events/actions";
import { selectEventsLists } from "../store/events/selectors";
import { clearMessage, setMessage } from "../store/appState/actions";

export default function OurServices() {
  const eventLists = useSelector(selectEventsLists);
  const dispatch = useDispatch();
  // console.log("EventsList", eventLists);
  //dispatch(clearMessage());
  useEffect(() => {
    dispatch(getEventsLists);
  }, [dispatch]);

  return (
    <div className='div_ourservices'>
      {eventLists.map((events) => {
        return (
          <div className='div_inner_details' key={events.id}>
            <Link to={`/events/${events.id}`}>
              <div className='event_title'>{events.title}</div>
              <div className='div_ourservice_image'>
                <img src={events.imageUrl} alt='event by people' />
              </div>
            </Link>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}
