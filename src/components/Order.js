import "./Order.css";
import moment from "moment";
import BasketItem from "./BasketItem";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Your Orders</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item) => (
        <BasketItem {...item} />
      ))}
      <CurrencyFormat
        renderText={(value) => <h3 className="order__total">{value}</h3>}
        decimalScale={2}
        value={order.data.amount / 100} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default Order;
