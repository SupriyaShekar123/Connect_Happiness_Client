import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { createEvents } from "../store/eventsDetails/actions";

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

  function submit(event) {
    event.preventDefault();
    console.log("submit");
    const eventFormDetails = {
      title: title,
      detail: detail,
      imageUrl: imageUrl,
      date: date,
      location: location,
      userId: userId.id,
    };
    dispatch(createEvents(eventFormDetails));
    history.push("/ourServices");
  }

  return (
    <div className='div_main_event_form'>
      <div className='div_inner_event_form'>
        <form>
          <label>Title</label>
          <input
            className='event_form'
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>Detail</label>
          <textarea
            className='event_form'
            type='text'
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
          <label>ImageUrl</label>
          <input
            className='event_form'
            type='url'
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
          <label>Date</label>
          <input
            className='event_form'
            type='datetime-local'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <label>location</label>
          <input
            className='event_form'
            type='address'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <button onClick={submit}>Add this Event</button>
        </form>
      </div>
    </div>
  );
}