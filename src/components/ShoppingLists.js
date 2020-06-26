import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopping } from "../store/shopping/actions";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { selectUser } from "../store/user/selectors";
import { selectShoppingListId } from "../store/shopping/selectors";

export default function ShoppingLists() {
  const [category, setCategories] = useState({ shop: "groceries" });
  const [list, setList] = useState("");
  const user = useSelector(selectUser);

  const shoppingListsId = useSelector(selectShoppingListId);
  // console.log("ShoppingListId", shoppingListsId.id);

  // const id = shoppingListsId.id;
  // console.log("id", id);

  // console.log("user", user.id);
  const dispatch = useDispatch();

  function submit(event) {
    event.preventDefault();

    const lists = { category, list, userId: user.id };
    console.log("LISTS", lists);

    dispatch(shopping(lists));
    console.log("ShoppingListId", shoppingListsId.id);

    //dispatch(sendMail, id);
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h3 className='mt-5 mb-5'>Shopping Form</h3>
        <Form.Group controlId='exampleForm.ControlSelect2'>
          <Form.Label>Categories:</Form.Label>
          <Form.Control
            as='select'
            name='shop'
            value={category}
            onChange={(event) => setCategories(event.target.value)}>
            <option value='groceries'>groceries</option>
            <option value='medicines'>medecines</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Details:</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            value={list}
            onChange={(event) => setList(event.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId='formBasicEmail'>
          <Form.Label>Required by:</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type='date'
            
            required
          />
        </Form.Group> */}
        <Form.Group className='mt-5'>
          <Button variant='primary' type='submit' onClick={submit}>
            Log in
          </Button>
        </Form.Group>
      </Form>
    </Container>
    // <div>
    //   <h2>Shopping form</h2>
    //   <form className='form'>
    //     <label className='label'>Categories:</label>
    //     <select
    //       className='select'
    //       name='shop'
    //       value={category}
    //       onChange={(event) => setCategories(event.target.value)}>
    //       <option value='groceries'>groceries</option>
    //       <option value='medicines'>medicines</option>
    //     </select>
    //     <label className='label'>Details</label>
    //     <textarea
    //       className='input'
    //       value={list}
    //       onChange={(event) => setList(event.target.value)}>
    //       Hello
    //     </textarea>
    //     <button onClick={submit}>Submit</button>
    //   </form>
    // </div>
  );
}
