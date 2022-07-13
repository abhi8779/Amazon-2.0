import { useEffect } from "react";
import { getAuth } from "firebase/auth";
// import { app } from "./firebaseSetup";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { useStore } from "./store/store-context-provider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrdersPage from "./pages/OrdersPage";
import "./App.css";

function App() {
  const [, dispatchFn] = useStore();

  const stripePromise = loadStripe(
    "pk_test_51LJfE8SIni12pfgXb4CyTRIFbKpbeMyYZAASo3UJ2NLxBM2dct7o4rVHSVkkQpiE356ThlciaDGlgiHU8WEg4T2M00kTWrXrin"
  );
  // console.log(stripePromise);

  // const auth = getAuth(app);
  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     console.log("THE USER IS >>> ", authUser);

  //     if (authUser) {
  //       // the user just logged in / the user was logged in
  //       dispatchFn({ type: "SET_USER", payload: authUser });
  //     } else {
  //       //the user is logged out
  //       dispatchFn({
  //         type: "SET_USER",
  //         payload: null,
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatchFn({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatchFn({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <CheckoutPage />
            </>
          }
        ></Route>
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            </>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
