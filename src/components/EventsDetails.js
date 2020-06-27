import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsDetails } from "../store/eventsDetails/actions";
import { selectEventsDetails } from "../store/eventsDetails/selectors";
import { selectToken } from "../store/user/selectors";
import { participents, removeUser } from "../store/eventsDetails/actions";
import { selectUser } from "../store/user/selectors";

export default function EventsDetails() {
  const [messages, setMessage] = useState(
    "Please login or sign up to add to the event"
  );
  const userId = useSelector(selectUser);
  console.log("userId", userId);
  const token = useSelector(selectToken);
  // console.log("token", token);
  const { id } = useParams();
  const eventDetails = useSelector(selectEventsDetails);
  console.log("eventsDetails", eventDetails);

  // const t = eventDetails.map((prticepents) => {
  //   const findParticepents = prticepents.participents.find((event) => {
  //     if (event.userId === userId.id) {
  //       return event.id;
  //     }
  //   });

  //   console.log(" VALUE PARTICIPENTS :", findParticepents.id);

  // });

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
    // console.log("Please Sign up or login to join the event");
    if (token === null) {
      //alert("Please Signup if new User or Login if existing user to join.");
      history.push("/login");
    } else {
      dispatch(participents(datas));
      history.push("/ourServices");
    }
  }

  // const participentsId = eventDetails.map((participent) => {
  //   return participent.participents.id;
  // });
  // console.log("Ids", participentsId);
  function remove() {
    console.log("removed");
    const t = eventDetails.map((prticepents) => {
      const findParticepents = prticepents.participents.find((event) => {
        if (event.userId === userId.id) {
          return event.id;
        }
      });

      console.log(" VALUE PARTICIPENTS :", findParticepents.id);
      const id = findParticepents.id;
      dispatch(removeUser(id));
    });
    history.push("/ourservices");
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
              <div>
                {" "}
                date :{" "}
                {new Intl.DateTimeFormat("en-FB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                }).format(Date.parse(details.date))}{" "}
              </div>
              <div> Number of people joined :{details.participents.length}</div>
            </div>
          );
        })}
        <div className='event_join_btn'>
          {
            eventDetails.map((prticepents) => {
              const findParticepents = prticepents.participents.find(
                (event) => event.userId === userId.id
              );
              console.log("find", findParticepents);

              if (findParticepents === undefined) {
                return <button onClick={submit}>Join this event</button>;
              } else if (findParticepents !== undefined) {
                return (
                  <div>
                    <p>You are attending</p>
                    <button onClick={remove}>Cancle</button>
                  </div>
                );
              }
            })
            // userId.roles != "seniorCitizen" && (
            //   <button onClick={submit}>Join this event</button>
            // )
          }
        </div>
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
