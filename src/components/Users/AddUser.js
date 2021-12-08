import React, { useState, useRef } from "react";

import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invlid Input!",
        message: "Please enter a valid name and age (non-emoty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invlid Age!",
        message: "Please enter a valid Age and age ( > 0 ).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" ref={nameInputRef} />
          </div>
          <div>
            <label htmlFor="age">Age (years)</label>
            <input id="age" type="number" ref={ageInputRef} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
