import { createContext, useReducer } from "react";

export const Store = createContext();
//define um inicial state
const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
    switch (action.type) {
        // adiciona item ao carrinho
      case "CART_ADD_ITEM":
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find((x) => x._id === newItem._id)
        const cartItems = existItem
        ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item)
        : [...state.cart.cartItems, newItem]
        //adiociona o novo item no final do array em cartItems
        return {...state, cart:{...state.cart, cartItems}}
        
      default: 
        return state;
    }
}


//componente para passar dados de forma global
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
  }