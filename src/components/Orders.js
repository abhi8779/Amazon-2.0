import { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../firebaseSetup";
const Orders = () => {
  const [orders, setOrders] = useState("");

  useEffect(() => {}, []);

  return <div className="orders"></div>;
};

export default Orders;
