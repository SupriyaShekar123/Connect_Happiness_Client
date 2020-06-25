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
    <div>
      {eventLists.map((events) => {
        return (
          <div>
            <p>{events.title}</p>
            <img src={events.imageUrl} />

            <Link to={`/events/${events.id}`}>
              <button>Read More</button>
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
