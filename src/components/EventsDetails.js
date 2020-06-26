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
  console.log("eventsDetails", eventDetails);

  const part = eventDetails.participents;
  // console.log("Count of Participatnat", part[0].id);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getEventsDetails(id));
  }, [dispatch, id]);

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
    <div className='div_eventDetails'>
      {eventDetails.map((details) => {
        return (
          <div className='div_events_image' key={details.id}>
            <img className='image_events' src={details.imageUrl} />
          </div>
        );
      })}

      <div className='div_events_image'>
        {eventDetails.map((details) => {
          return (
            <div className='div_event_title' key={details.id}>
              <h2>{details.title}</h2>
              <div> location : {details.location}</div>
              <div> date : {details.date} </div>
              <div> Number of people joined :{details.participents.length}</div>

              <div className='event_join_btn'>
                <button onClick={submit}>Join this event</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className='div_events_detail'>
        <div>
          <h3>Details</h3>
        </div>
        {eventDetails.map((details) => {
          return <div key={details.id}>{details.detail}</div>;
        })}
      </div>
    </div>
  );
}
