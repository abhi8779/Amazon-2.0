import "./BasketItem.css";
import { useStore } from "../store/store-context-provider";

const BasketItem = ({ id, price, image, title, rating, quantity }) => {
  const [{}, dispatchFn] = useStore();

  const removeFromBasketHandler = () => {
    console.log("rem");

    dispatchFn({ type: "REMOVE_FORM_BASKET", payload: id });
  };
  return (
    <div className="checkoutItems">
      <img className="checkoutItems__image" src={image} alt="" />
      <div className="checkoutItems__info">
        <p className="checkoutItems__title">{title}</p>
        <p className="checkoutItems__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p>Qty : x{quantity}</p>
        <div className="checkoutItems__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <button
          onClick={removeFromBasketHandler}
          className="checkoutItems__button"
        >
          Remove from basket
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
