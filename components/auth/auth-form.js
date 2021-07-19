import { useState, useRef } from "react";
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import mainConstants from "../../lib/mainConstants.json";

import classes from "./auth-form.module.css";

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const validationSchemaLogin = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

const validationSchemaRegister = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordCheck: yup
    .string('Enter your password confirmation')
    .when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
        "Both password need to be the same"
      )
    })
});

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
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  controlFormLight: {
    marginBottom: 20,

    // (Note: space or no space after & matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {  // - The Input-root, inside the TextField-root
      backgroundColor: mainConstants.form.light.background,
      borderColor: mainConstants.form.light.border,
      "& fieldset": {               // - The <fieldset> inside the Input-root
        borderColor: mainConstants.form.light.border,     // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: mainConstants.form.light.border,     // - Set the Input border when parent has :hover
      },
      "&.Mui-focused": {   // - Set the Input border when parent is focused 
        color: mainConstants.form.light.borderFocus,
        backgroundColor: mainConstants.form.light.backgroundFocus,
        "& fieldset": {   // - Set the Input border when parent is focused 
          borderColor: mainConstants.form.light.borderFocus,
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: mainConstants.form.light.border,
      "&.Mui-focused": {
        color: mainConstants.form.light.borderFocus,
      },

    },
  },
  controlFormDark: {
    marginBottom: 20,

    // (Note: space or no space after & matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {  // - The Input-root, inside the TextField-root
      backgroundColor: mainConstants.form.dark.background,
      borderColor: mainConstants.form.dark.border,
      color: mainConstants.text.primary,
      "& fieldset": {               // - The <fieldset> inside the Input-root
        borderColor: mainConstants.form.dark.border,     // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: mainConstants.form.dark.border,     // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {   // - Set the Input border when parent is focused 
        borderColor: mainConstants.form.dark.border,
      },
    },
    "& .MuiInputLabel-root": {
      color: mainConstants.form.dark.border,
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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    validationSchema: isLogin ? validationSchemaLogin : validationSchemaRegister,
    onSubmit: async values => {

      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (!result.error) {
          // set some auth state
          router.replace('/profile');
        }
      } else {
        try {
          // const result = await createUser(enteredEmail, enteredPassword);
          const result = await createUser(
            values.firstName,
            values.lastName,
            values.email,
            values.password
          );
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }

    },
  });

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formik.handleSubmit}>
        {isLogin ? null : (
          <>

            <TextField
              className={classesMUI.controlFormDark}
              required
              variant="outlined"
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              className={classesMUI.controlFormDark}
              variant="outlined"
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

          </>
        )}

        <TextField
          className={classesMUI.controlFormDark}
          required
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className={classesMUI.controlFormDark}
          required
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {isLogin ? null : (
          <TextField
            className={classesMUI.controlFormDark}
            required
            variant="outlined"
            fullWidth
            id="passwordCheck"
            name="passwordCheck"
            label="Confirm Password"
            type="password"
            value={formik.values.passwordCheck}
            onChange={formik.handleChange}
            error={formik.touched.passwordCheck && Boolean(formik.errors.passwordCheck)}
            helperText={formik.touched.passwordCheck && formik.errors.passwordCheck}
          />
        )}

        <div className={classesMUI.root}>
          {errorMessage.show ?
            <Alert severity="error">{errorMessage.message}</Alert>
            :
            null
          }
        </div>

        <div className={classes.actions} disabled={Object.keys(formik.errors).length}>
          <Button
            color="primary"
            variant="contained"
            fullWidth type="submit"
          // disabled={Object.keys(formik.errors).length}
          >
            {isLogin ? "Login" : "Create Account"}
          </Button>

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
