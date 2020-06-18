import React, { useState, useEffect } from "react";

//import { login } from "../../store/user/actions";
//import { selectToken } from "../../store/user/selectors";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { Col } from "react-bootstrap";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const dispatch = useDispatch();
  //const token = useSelector(selectToken);
  //const history = useHistory();

  //   useEffect(() => {
  //     if (token !== null) {
  //       history.push("/");
  //     }
  //   }, [token, history]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    //dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <form>
        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>password</label>
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit' onClick={submitForm}>
          Log in
        </button>
        <Link to='/signup' style={{ textAlign: "center" }}>
          Click here to sign up
        </Link>
      </form>
    </div>
  );
}
