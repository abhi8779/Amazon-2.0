import "./Checkout.css";
import SubTotal from "../components/SubTotal";
import { useStore } from "../store/store-context-provider";
import BasketItem from "./BasketItem";
const Checkout = () => {
  const [{ cart, user }] = useStore();
  const userName = user?.email.split("@")[0];

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          alt="ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          className="checkout__ad"
        ></img>
        <div>
          <h1>{`Hello ${user ? userName : "Guest"}`}</h1>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {cart.map((item) => (
            <BasketItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
};

export default Checkout;
