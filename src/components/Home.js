import React from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../store/appState/actions";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(clearMessage());
  return (
    <div className='div_homepage_main'>
      <div className='div_homepage'>
        <h2>Connect Happiness - Helping your Community</h2>
        <div>
          <img
            className='image'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShqo9WKI_O_mJf-JD6U9fOxi5dS5p3UcZcbw&usqp=CAU'
            alt='connect happiness'
          />
        </div>
        <div className='homepage_paragraph'>
          <p>
            Connect Happiness are run by local volunteers who provide day to day
            support for other residents who may need help on an occasional or
            regular basis.
          </p>{" "}
          <p>
            For older people, this support may enable them to live independently
            in their own homes and communities for longer and reduce feelings of
            isolation and loneliness.
          </p>{" "}
          <p>
            {" "}
            Connect Happiness are community projects run and delivered by groups
            of local volunteers. Whilst potentially benefiting the whole
            community, they are aimed primarily at helping elderly, disabled,
            vulnerable, frail or isolated people.
          </p>{" "}
          <p>
            Help is given to those in need free of charge although a reasonable
            charge is usually made for transport mileage.
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
