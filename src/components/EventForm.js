import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { createEvents } from "../store/eventsDetails/actions";
import { selectMessage } from "../store/appState/selectors";
import { clearMessage } from "../store/appState/actions";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState([]);
  const [location, setLocation] = useState("");
  const userId = useSelector(selectUser);
  console.log("userId", userId.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const appSuccessMessage = useSelector(selectMessage);

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
    dispatch(createEvents(eventFormDetails));
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
        <div class='div_shooping_req_heading'>Provide Details for Event</div>
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
