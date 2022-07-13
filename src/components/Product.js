import "./Product.css";
import { useStore } from "../store/store-context-provider";

const Product = ({ id, title, image, price, rating, quantity }) => {
  const [{}, dispatchFn] = useStore();

  const AddToBasketHandler = () => {
    dispatchFn({
      type: "ADD_TO_BASKET",
      payload: { id, title, image, price, rating, quantity },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <big>{price}</big>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p key={Math.random()}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="img" />
      <button onClick={AddToBasketHandler}>Add to Basket</button>
    </div>
  );
};

export default Product;
