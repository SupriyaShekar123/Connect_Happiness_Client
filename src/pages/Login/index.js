import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { clearMessage } from "../../store/appState/actions";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearMessage());
    if (token !== null) {
      history.push("/");
    }
  }, [token, history, dispatch]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <div className='div_login_main'>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
          <div className='heading_login'>
            <h2 className='mt-5 mb-5'>Login</h2>
          </div>
          <div className='div_login_lables'>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type='email'
                placeholder='Enter email'
                required
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type='password'
                placeholder='Password'
                required
              />
            </Form.Group>
          </div>
          <div className='login_btn'>
            <Form.Group className='mt-5'>
              <Button variant='primary' type='submit' onClick={submitForm}>
                Log in
              </Button>
            </Form.Group>
            <Link to='/signup' style={{ textAlign: "center" }}>
              Click here to sign up
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
