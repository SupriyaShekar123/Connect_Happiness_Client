import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopping } from "../store/shopping/actions";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { clearMessage } from "../store/appState/actions";
import { selectUser } from "../store/user/selectors";
import { selectShoppingListId } from "../store/shopping/selectors";
import { selectMessage } from "../store/appState/selectors";

export default function ShoppingLists() {
  const [category, setCategories] = useState("groceries");
  const [list, setList] = useState("");
  const [requiredBy, setrequiredBy] = useState(0);
  const user = useSelector(selectUser);
  const history = useHistory();

  const shoppingListsId = useSelector(selectShoppingListId);
  const appSuccessMessage = useSelector(selectMessage);

  console.log("THE VALUE SUCCESS MESSAGE : ", appSuccessMessage);

  // console.log("ShoppingListId", shoppingListsId.id);

  // const id = shoppingListsId.id;
  // console.log("id", id);

  // console.log("user", user.id);
  const dispatch = useDispatch();

  // this funciton is to sumbit the request from the senior citizen.
  function submit(event) {
    event.preventDefault();

    // this dispatch is used to clear the app state error message.
    dispatch(clearMessage());

    const lists = { category, list, userId: user.id, requiredBy };
    console.log("LISTS", lists);

    // this dispatch is used to send post data request to backend server
    dispatch(shopping(lists));
    console.log("ShoppingListId", shoppingListsId.id);
  }

  // this condition is to navigate to shopping details on successfully submission
  if (appSuccessMessage != null && appSuccessMessage.dismissable === false) {
    history.push("./shoppingDetails");
  }
  const today = new Date().toISOString().split(":");
  return (
    <div className='shopping_form'>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
          <h3 className='mt-5 mb-5'>Shopping Form</h3>
          <Form.Group controlId='exampleForm.ControlSelect2'>
            <Form.Label>Categories:</Form.Label>
            <Form.Control
              as='select'
              value={category}
              required={true}
              onChange={(event) => setCategories(event.target.value)}>
              <option value='groceries'>groceries</option>
              <option value='medicines'>medecines</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='formBasicTextArea'>
            <Form.Label>Details:</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              value={list}
              required
              onChange={(event) => setList(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='formBasicDate'>
            <Form.Label>Required By</Form.Label>
            <Form.Control
              value={requiredBy}
              onChange={(event) => setrequiredBy(event.target.value)}
              type='datetime-local'
              min={today[0] + ":" + today[1]}
              //placeholder='Password'
              required
            />
          </Form.Group>

          <Form.Group className='mt-5'>
            <Button variant='primary' type='submit' onClick={submit}>
              Request
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
