import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../store/store-context-provider";
import { getBasketTotalFn } from "../store/store-context-provider";
import { instance as axios } from "../axios";
import CurrencyFormat from "react-currency-format";
import BasketItem from "./BasketItem";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./Payment.css";
import { collection, query, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";

const Payment = () => {
  const naviagte = useNavigate();
  const [{ cart, user }, dispatchFn] = useStore();
  const cartItemCount =
    cart.length === 1 ? `${cart.length} item` : `${cart.length} items`;

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotalFn(cart) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log("secret is >>>", clientSecret);
  console.log("👱", user);

  // const submitHandler = async (e) => {
  //   //all srtipe stuff
  //   e.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(async (response) => {
  //       const paymentIntent = response.error.payment_intent;
  //       console.log(paymentIntent);
  //       console.log(user.uid);

  //       // const q = query(collection(db, "users"));

  //       // const querySnapshot = await getDocs(q);

  //       // const queryData = querySnapshot.forEach((doc) => {
  //       //   console.log(doc.id, " => ", doc.data());
  //       // });
  //       // console.log(queryData);

  //       // paymentIntent = payment conformation

  //       const cartCollectionRef = collection(db, "users", user.uid);
  //       const orderCollectionRef = collection(db, "orders");

  //       // await addDoc(cartCollectionRef, {
  //       //   cart: cart,
  //       //   amount: intent.amount,
  //       //   created: intent.created,
  //       // });
  //       await setDoc(doc(db, "cities", user.uid), {
  //         cart: cart,
  //         amount: paymentIntent.amount,
  //         created: paymentIntent.created,
  //       });

  //       // await setDoc(cartCollectionRef, );

  //       // db.collection("users")
  //       //   .document(user?.uid)
  //       //   .collection("orders")
  //       //   .document(paymentIntent.id)
  //       //   .set({
  //       //     cart: cart,
  //       //     amount: paymentIntent.amount,
  //       //     created: paymentIntent.created,
  //       //   });

  //       setSucceeded(true);
  //       setError(null);
  //       setProcessing(false);

  //       dispatchFn({
  //         type: "EMPTY_BASKET",
  //       });

  //       naviagte("/orders", { replace: true });
  //     });
  // };

  //testing
  const submitHandler = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const cardElementChangeHandler = (e) => {
    //listen fro changes in the CardElement
    // and display any errors ass the customer types details

    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout ({<Link to="/checkout"> {cartItemCount}</Link>})</h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivary Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Koperkhairne sec 12</p>
            <p>street no 05 62</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => {
              return <BasketItem {...item} />;
            })}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={submitHandler}>
              <CardElement onChange={cardElementChangeHandler} />

              <div className="payment__priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotalFn(cart)} // Part of the homework
                  displayType="text"
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
