import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../store/store-context-provider";
import { getBasketTotalFn } from "../store/store-context-provider";
import { instance as axios } from "../axios";
import CurrencyFormat from "react-currency-format";
import BasketItem from "./BasketItem";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./Payment.css";
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


  const submitHandler = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((response) => {
        const paymentIntent = response.error.payment_intent;

        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatchFn({
          type: "EMPTY_BASKET",
        });

        naviagte("/orders", { replace: true });
      });
  };

  const cardElementChangeHandler = (e) => {
    //listen gor changes in the CardElement
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
                  renderText={(value) => <h4>Order Total: {value}</h4>}
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
