import { useState, useRef } from "react";
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from "./auth-form.module.css";

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

async function createUser(firstName, lastName, email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AuthForm() {
  const classesMUI = useStyles();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordCheckInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ show: false, message: "" });
  const [warningMessage, setWarningMessage] = useState({ show: false, message: "" });
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  };

  async function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current ? firstNameInputRef.current.value : undefined;
    const enteredLastName = lastNameInputRef.current ? lastNameInputRef.current.value : undefined;
    const enteredEmail = emailInputRef.current ? emailInputRef.current.value : undefined;
    const enteredPassword = passwordInputRef.current ? passwordInputRef.current.value : undefined;
    const enteredPasswordCheck = passwordCheckInputRef.current ? passwordCheckInputRef.current.value : undefined;

    // Validation 
    if (enteredPassword != enteredPasswordCheck) {
      const message = "Passwords do not match!"
      setErrorMessage({ show: true, message });

      console.log("PASSWORD DOESNT MATCH!");
      return;
    }

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace('/profile');
      }
    } else {
      try {
        // const result = await createUser(enteredEmail, enteredPassword);
        const result = await createUser(
          enteredFirstName,
          enteredLastName,
          enteredEmail,
          enteredPassword
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {isLogin ? null : (
          <>
            <div className={classes.control}>
              <label htmlFor="fisrtName">Your Name</label>
              <input
                type="text"
                id="fisrtName"
                required
                ref={firstNameInputRef}
              />
            </div>

            <div className={classes.control}>
              <label htmlFor="lastName">Your Lastname</label>
              <input
                type="text"
                id="lastName"
                required
                ref={lastNameInputRef}
              />
            </div>
          </>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {isLogin ? null : (
          <div className={classes.control}>
            <label htmlFor="passwordCheck">Confirm Password</label>
            <input
              type="password"
              id="passwordCheck"
              required
              ref={passwordCheckInputRef}
              error
            />
          </div>
        )}

        <div className={classesMUI.root}>
          {errorMessage.show ?
            <Alert severity="error">{errorMessage.message}</Alert>
            :
            null
          }
        </div>

        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
