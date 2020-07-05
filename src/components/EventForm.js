import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { createEvents } from "../store/eventsDetails/actions";
import { selectMessage } from "../store/appState/selectors";
import { clearMessage, setMessage } from "../store/appState/actions";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // "https://www.dominicavibes.dm/wp-content/uploads/2018/09/New-event-star.jpg"
  const [date, setDate] = useState([]);
  const [location, setLocation] = useState("");
  const userId = useSelector(selectUser);
  console.log("userId", userId.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const appSuccessMessage = useSelector(selectMessage);

  const today1 = new Date();

  function submit(event) {
    event.preventDefault();
    dispatch(clearMessage());

    const eventFormDetails = {
      title: title,
      detail: detail,
      imageUrl: imageUrl,
      date: date,
      location: location,
      userId: userId.id,
    };

    console.log("Event Details ", eventFormDetails, " ", date.length);

    let datetime;
    if (date.length !== 0) {
      datetime =
        (new Date(date.split("T")[0]).getTime() - today1.getTime()) /
        (1000 * 3600 * 24);
      console.log("Difference in Time", datetime);
    }

    // *****************
    if (!title || !detail || date === undefined || !location || !userId) {
      dispatch(setMessage("danger", true, "Fill the mandatoary fields"));
    } else if (date === undefined || date == "") {
      console.log("Event Details ", eventFormDetails);
      dispatch(
        setMessage("danger", true, "Date Field is not filled correctly ")
      );
    } else if (
      // validation check for dates

      datetime < 7 ||
      datetime > 365

      // parseInt(date.split("-")[0]) < today1.getFullYear() ||
      // parseInt(date.split("-")[0]) > today1.getFullYear() + 1
    ) {
      dispatch(
        setMessage(
          "danger",
          true,
          "Events  date start date should be after 7 days from the present date and less than an year"
        )
      );
    } else {
      console.log("SINGN UP DATA ", eventFormDetails);
      dispatch(createEvents(eventFormDetails));
    }

    //*********** */

    // dispatch(createEvents(eventFormDetails));
    // history.push("/ourServices");
  }

  if (appSuccessMessage != null && appSuccessMessage.dismissable === false) {
    history.push("/ourServices");
  }
  const today = new Date().toISOString().split(":");
  // console.log("DATE TODAU ", today);
  return (
    <div className='div_main_event_form'>
      <div className='div_inner_event_form'>
        <div className='div_shooping_req_heading'>
          Provide Details for Event
        </div>
        <form>
          <div className='div_event_left'>
            <label>Title</label>
          </div>
          <div className='div_event_right'>
            <input
              className='event_form'
              type='text'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className='div_event_left'>
            <label>Detail</label>
          </div>
          <div className='div_event_right'>
            <textarea
              className='event_form'
              type='text'
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
            />
          </div>
          <div className='div_event_left'>
            <label>ImageUrl</label>
          </div>
          <div className='div_event_right'>
            <input
              className='event_form'
              type='url'
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>
          <div className='div_event_left'>
            <label>Date</label>
          </div>

          <div className='div_event_right'>
            <input
              className='event_form_date_value'
              type='datetime-local'
              min={today[0] + ":" + today[1]}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className='div_event_left'>
            <label>location</label>
          </div>

          <div className='div_event_right'>
            <input
              className='event_form'
              type='address'
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className='div_event_create_submit_btn'>
            <button onClick={submit}>Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
