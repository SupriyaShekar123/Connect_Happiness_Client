import React, { useState, useEffect } from "react";

//import { signUp } from "../../store/user/actions";
//import { selectToken } from "../../store/user/selectors";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [house_num, setHouse_num] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [roles, setRoles] = useState("");
  const [seniorCitizens, setSeniorcitizens] = useState("");
  const [publics, setPublic] = useState("");
  const [volunteer, setVolunteer] = useState("");

  //const [isartist, setIsArtist] = useState(false);
  //const dispatch = useDispatch();
  //const token = useSelector(selectToken);
  //const history = useHistory();

  //   useEffect(() => {
  //     if (token !== null) {
  //       history.push("/");
  //     }
  //   }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    //dispatch(signUp(name, email, password, isartist));

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <div>
      <form>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>DOB</label>
        <input
          type='Date'
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
        <label>#NO.</label>
        <input
          type='number'
          value={house_num}
          onChange={(event) => setHouse_num(event.target.value)}
        />
        <label>Street</label>
        <input
          type='text'
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <label>Postcode</label>
        <input
          type='text'
          value={postcode}
          onChange={(event) => setPostcode(event.target.value)}
        />
        <label>City</label>
        <input
          type='text'
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <label>Phone</label>
        <input
          type='phone'
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <input
          type='checkbox'
          value={seniorCitizens}
          onChange={(event) => setSeniorcitizens(event.target.value)}
        />
        <label>Senior Citizen</label>

        <input
          type='checkbox'
          value={publics}
          onChange={(event) => setPublic(event.target.value)}
        />
        <label>Public</label>

        <input
          type='checkbox'
          value={volunteer}
          onChange={(event) => setVolunteer(event.target.value)}
        />
        <label>Volunteer</label>
        <button type='submit' onClick={submitForm}>
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
}
