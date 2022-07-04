import { useState } from "react";

const useInput = (validationfunction) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationfunction(enteredValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    setEnteredValue,
    hasError,
    isValid,
    valueChangeHandler,
    onBlurHandler,
    reset,
    value: enteredValue,
  };
};

export default useInput;
