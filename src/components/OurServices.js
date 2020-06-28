import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsLists } from "../store/events/actions";
import { selectEventsLists } from "../store/events/selectors";
import { selectUser, selectToken } from "../store/user/selectors";

export default function OurServices() {
  const eventLists = useSelector(selectEventsLists);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  console.log("EventsList", eventLists);
  const history = useHistory();

  const dispatch = useDispatch();

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
      <div>
        {/* {token === null ||
        user.roles === "general" ||
        user.roles === "volunteer" ? (
          history.push("./login")
        ) : (
          <Link to={"/eventform"}>
            <button>Start an event</button>
          </Link>
        )} */}
      </div>
    </div>
  );
}
