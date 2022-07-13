import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import useFormInputValidation from "../hooks/useFormInputValidation";
import { app } from "../firebaseSetup";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  //firebase auth
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [registerActive, setRegisterActive] = useState(false);

  //Using  Custom Hooks
  const {
    value: email,
    setValue: setEmail,
    valueIsValid: emailIsValid,
    valueTouched: emailTouched,
    setValueTouched: setEmailTouched,
    inValidCss: EmailInValidCss,
  } = useFormInputValidation(
    (email) => /.+@.+\.[A-Za-z]+$/.test(email),
    "invalidEmail"
  );
  const {
    value: password,
    setValue: setPassword,
    valueIsValid: passwordIsValid,
    valueTouched: passwordTouched,
    setValueTouched: setPasswordTouched,
    inValidCss: PasswordInValidCss,
  } = useFormInputValidation(
    (password) => password.trim().length > 5,
    "invalidPassword"
  );

  const overAllFromValid = emailIsValid && passwordIsValid;

  const signInHandler = (e) => {
    e.preventDefault();
    //Gurard Claw
    if (!overAllFromValid) return;

    if (registerActive) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          alert("Account Created Sucessfully");
          // ...
        })
        .catch((error) => {
          alert("Account already exists! use sign-in option");

          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/");

          // ...
        })
        .catch((error) => {
          alert("Plase Create your amazon account before logging in");
        });
    }
    setPassword("");
    setEmail("");
    setPasswordTouched(false);
    setEmailTouched(false);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    setPassword("");
    setEmail("");
    setPasswordTouched(false);
    setEmailTouched(false);
    setRegisterActive((prevState) => !prevState);
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon"
        />
      </Link>

      <div className="login__container">
        <h1>{registerActive ? "Register" : "Sign-in"}</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            className={EmailInValidCss}
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => setEmailTouched(true)}
          />
          {emailTouched && !emailIsValid && (
            <p style={{ color: "red" }}>Enter Valid Email</p>
          )}

          <h5>Password</h5>
          <input
            className={PasswordInValidCss}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
          />
          {passwordTouched && !passwordIsValid && (
            <p style={{ color: "red" }}>Enter Valid Password (min 6 digits)</p>
          )}

          <button
            disabled={!overAllFromValid}
            onClick={signInHandler}
            className="login__signInButton"
          >
            {registerActive ? "Create Account" : "SIgn In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={registerHandler} className="login__registerButton">
          {registerActive ? "Sign In" : "Create your Amazon Account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
