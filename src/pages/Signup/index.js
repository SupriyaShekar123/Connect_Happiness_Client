import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  let roles = [
    { name: "seniorCitizen", result: "pass" },
    { name: "general", result: "pass" },
    { name: "volunteer", result: "pass" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState();
  const [phone, setPhone] = useState(0);
  const [house_num, setHouse_num] = useState(0);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [isChecked, setIsChecked] = useState({
    seniorCitizen: false,
    general: false,
    volunteer: false,
  });
  const [formData, setFormData] = useState(roles);

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
    // console.log("check box ", isChecked, "     testing");
  };

  console.log("check box ", isChecked);

  function submitForm(event) {
    event.preventDefault();

    let roleValues = "";
    const roledata = Object.keys(isChecked).map((keyData) => {
      if (isChecked[keyData] === true) {
        // console.log("Condition reached ");
        if (roleValues.length > 1) {
          roleValues = roleValues + "," + keyData;
        } else {
          roleValues = roleValues + keyData;
        }
      }
      return roleValues;
    });

    const singupData = {
      name,
      email,
      password,
      dob,
      street,
      city,
      house_num,
      phone,
      postcode,
      roles: roleValues,
    };

    console.log("SINGN UP DATA ", singupData);
    dispatch(signUp(singupData));

    setEmail("");
    setPassword("");
    setName("");
    setCity("");
    setDob();
    setPhone();
    setPostcode("");
    setHouse_num();
    setStreet("");
  }

  const rolesData = formData.map((test) => {
    //console.log("What are roles", rolesData);
    return test.name;
  });

  // console.log("What are roles", rolesData);

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='mt-5 mb-5'>Signup</h1>
        <Form.Group controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type='text'
            placeholder='Enter name'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            placeholder='Enter email'
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
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
        <Form.Group controlId='formBasicDob'>
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            type='date'
            //placeholder='Password'
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formBasicPhone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type='tel'
            //placeholder='Password'
          />
        </Form.Group>

        <Form.Group controlId='formBasicCheckbox'>
          {formData.map((test) => {
            console.log(" test name : ", test.name);

            // if condition to validate the checkbox, user can only singin as senior citizen or (volunteer or general)
            if (
              isChecked.seniorCitizen === true &&
              test.name.toUpperCase() === "SENIORCITIZEN"
            ) {
              console.log(" enable  sernior citize ");
              return (
                <Form.Check
                  type='checkbox'
                  id={test.name}
                  label={test.name}
                  onChange={handleSingleCheck}
                />
              );
            } else if (
              (isChecked.general === true || isChecked.volunteer === true) &&
              (test.name.toUpperCase() === "GENERAL" ||
                test.name.toUpperCase() === "VOLUNTEER")
            ) {
              console.log("disable senior citizen");
              return (
                <Form.Check
                  type='checkbox'
                  id={test.name}
                  label={test.name}
                  onChange={handleSingleCheck}
                />
              );
            } else if (
              isChecked.seniorCitizen === false &&
              isChecked.general === false &&
              isChecked.volunteer === false
            ) {
              return (
                <Form.Check
                  type='checkbox'
                  id={test.name}
                  label={test.name}
                  onChange={handleSingleCheck}
                />
              );
            } else {
              return (
                <Form.Check
                  disabled
                  type='checkbox'
                  id={test.name}
                  label={test.name}
                  onChange={handleSingleCheck}
                />
              );
            }
          })}
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridHouse_num'>
            <Form.Label>House_num</Form.Label>
            <Form.Control
              value={house_num}
              onChange={(event) => setHouse_num(event.target.value)}
              type='number'
              placeholder='#39'
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridStreet'>
            <Form.Label>Street</Form.Label>
            <Form.Control
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              type='text'
              //placeholder=''
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridZip'>
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              type='text'
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridCity'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              type='text'
              placeholder='city'
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Group className='mt-5'>
          <Button variant='primary' type='submit' onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to='/login'>Click here to log in</Link>
      </Form>
    </Container>
  );
}
