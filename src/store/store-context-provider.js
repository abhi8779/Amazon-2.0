import React, { useContext, useReducer } from "react";
import { StoreContext } from "./store-context";

//Selector
export const getBasketTotalFn = (cart) =>
  cart.reduce((total, curItem) => total + +curItem.price * curItem.quantity, 0);

const initialState = {
  cart: [],
  totalCartItem: 0,
  user: null,
};

const reducerFn = (state, action) => {
  if (action.type === "ADD_TO_BASKET") {
    const cartCopy = [...state.cart];
    const itemExists = state.cart.find((item) => item.id === action.payload.id);
    if (itemExists) {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemExists.id
      );
      const updatedItemExists = {
        ...itemExists,
        quantity: itemExists.quantity + 1,
      };
      cartCopy[existingItemIndex] = updatedItemExists;

      return {
        ...state,
        totalCartItem: state.totalCartItem + 1,
        cart: cartCopy,
      };
    } else {
      return {
        ...state,
        totalCartItem: state.totalCartItem + 1,
        cart: [...state.cart, action.payload],
      };
    }
  }
  if (action.type === "REMOVE_FORM_BASKET") {
    const newItemList = state.cart.filter((item) => item.id !== action.payload);

    return {
      ...state,
      totalCartItem: state.totalCartItem - 1,
      cart: newItemList,
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "EMPTY_BASKET") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};

export const StoreContextProvider = (props) => {
  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  return (
    <StoreContext.Provider value={[state, dispatchFn]}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
