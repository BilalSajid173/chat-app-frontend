import React, { useState } from "react";

import EditModal from "../UI/EditModal";
import classes from "./EditProfile.module.css";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-6093f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const EditForm = <div></div>;

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {<button className={classes.button}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.total}>
        <span>Total Amount</span>
      </div>
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClick}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <EditModal onClose={props.onClick}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </EditModal>
  );
};

export default Cart;
