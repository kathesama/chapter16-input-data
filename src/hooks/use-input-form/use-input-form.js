/*
Created by: kathe
On: 26-Nov-21 : 3:06 PM
Project: chapter16-input-data
*/
import React, { useState, useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const init = () => initialInputState;

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }

  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }

  return inputStateReducer;
};

const useInputForm = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState, init);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputForm;
