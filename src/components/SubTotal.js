import "./SubTotal.css";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotalFn } from "../store/store-context-provider";
import { useStore } from "../store/store-context-provider";

const SubTotal = () => {
  const navigate = useNavigate();
  const [{ cart, totalCartItem }] = useStore();
  const cartItemCount =
    totalCartItem === 1 ? `${totalCartItem} item` : `${totalCartItem} items`;

  const proceedToCheckoutHandler = () => navigate("/payment");

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({cartItemCount}): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalFn(cart)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={proceedToCheckoutHandler}>Proceed to Checkout</button>
    </div>
  );
};

export default SubTotal;
