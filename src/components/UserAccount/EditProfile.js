import React, { useState, Fragment, useEffect, useContext } from "react";

import EditModal from "../UI/EditModal";
import classes from "./EditProfile.module.css";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = (props) => {
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [number, setNumber] = useState("");
  const authCtx = useContext(AuthContext);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    setEnteredValue: setEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
    setEnteredValue: setName,
  } = useInput((value) => value.trim() !== "");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!nameIsValid || !emailIsValid) {
      return;
    }
    fetch("https://konnectapp.onrender.com/post/edit-profile", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        address: address,
        bio: bio,
        number: number,
        linkedIn: linkedIn,
        github: github,
      }),
      headers: {
        Authorisation: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        props.saveEdit(data.user);
        toast.success("Profile Updated!");
      })
      .catch((err) => {
        console.log(err);
      });
    props.closeForm();
  };

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  const bioChangeHandler = (event) => {
    setBio(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const linkedInChangeHandler = (event) => {
    setLinkedIn(event.target.value);
  };

  const githubChangeHandler = (event) => {
    setGithub(event.target.value);
  };

  useEffect(() => {
    fetch("https://konnectapp.onrender.com/post/edit-profile/", {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setEmail(data.user.email);
        setName(data.user.name);
        setAddress(data.user.address ? data.user.address : "");
        setBio(data.user.bio ? data.user.bio : "");
        setGithub(data.user.github ? data.user.github : "");
        setLinkedIn(data.user.linkedIn ? data.user.linkedIn : "");
        setNumber(data.user.number ? data.user.number : "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token, setEmail, setName]);

  const nameClasses = nameHasError ? classes.invalid : "";
  const emailClasses = emailHasError ? classes.invalid : "";

  const EditFormContent = (
    <Fragment>
      <div className={classes.editform}>
        <form onSubmit={submitHandler} noValidate>
          <div className={nameClasses}>
            {nameHasError && (
              <p className={classes.error}>Please Enter a name.</p>
            )}
            <input
              placeholder="Name"
              type="text"
              id="name"
              autoComplete="off"
              required
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          <div className={emailClasses}>
            {emailHasError && (
              <p className={classes.error}>Please Enter a valid email.</p>
            )}
            <input
              placeholder="Email"
              type="email"
              id="email"
              autoComplete="off"
              required
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          <div>
            <input
              placeholder="City"
              type="text"
              autoComplete="off"
              onChange={addressChangeHandler}
              value={address}
            />
          </div>
          <div>
            <input
              placeholder="Bio"
              type="text"
              autoComplete="off"
              onChange={bioChangeHandler}
              value={bio}
            />
          </div>
          <div>
            <input
              placeholder="Phone"
              type="number"
              autoComplete="off"
              onChange={numberChangeHandler}
              value={number}
            />
          </div>
          <div>
            <input
              placeholder="LinkedIn"
              type="text"
              autoComplete="off"
              onChange={linkedInChangeHandler}
              value={linkedIn}
            />
          </div>
          <div>
            <input
              placeholder="Github"
              type="text"
              autoComplete="off"
              onChange={githubChangeHandler}
              value={github}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Done</button>
            <button type="button" onClick={props.onClick}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );

  return <EditModal onClose={props.onClick}>{EditFormContent}</EditModal>;
};

export default EditProfile;
