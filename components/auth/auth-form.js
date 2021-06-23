import { useState } from "react";
import classes from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {isLogin ? null : (
          <>
            <div className={classes.control}>
              <label htmlFor="fisrtName">Your Name</label>
              <input type="text" id="fisrtName" required />
            </div>

            <div className={classes.control}>
              <label htmlFor="lastName">Your Lastname</label>
              <input type="text" id="lastName" required />
            </div>
          </>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>

        {isLogin ? null : (
          <div className={classes.control}>
            <label htmlFor="passwordCheck">Confirm Password</label>
            <input type="password" id="passwordCheck" required />
          </div>
        )}

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
