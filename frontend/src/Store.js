import { createContext, useReducer } from "react";

export const Store = createContext();
//define um inicial state
const initialState = {
  //se userInfo existir em localStorage
  userInfo: localStorage.getItem("userInfo")
    ? //usa JSON.parse para converter userInfo em JavaScript object
      JSON.parse(localStorage.getItem("userInfo"))
    : null, //se não existir defina para null
  cart: {
    //se shippingAddress existir em localStorage
    shippingAddress: localStorage.getItem("shippingAddress")
      ? //usa JSON.parse para converter shippingAddress em JavaScript object
        JSON.parse(localStorage.getItem("shippingAddress"))
      : {}, //se não existir defina como obejeto vazio
    paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : '',
    //se cartItems existir em localStorage
    cartItems: localStorage.getItem("cartItems")
    ? //usa JSON.parse para converter cartItems em JavaScript object
      JSON.parse(localStorage.getItem("cartItems"))
    : //se não existir defina como um array vazio
      [],
  },
};
function reducer(state, action) {
    switch (action.type) {
        // adiciona item ao carrinho
      case "CART_ADD_ITEM":
        const newItem = action.payload;
        //verifica se o produto ja existe no carrinho
        const existItem = state.cart.cartItems.find((x) => x._id === newItem._id)
        //se o item ja existir em cartItems usa map function para atualizar apenas a quantidade em cartItems com newItem que veio de action.payload
        const cartItems = existItem
        ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item)
        : [...state.cart.cartItems, newItem] //se o item não existir adiociona o novo item no final do array em cartItems
        //usa JSON.stringify para converter cartItems em string e salvar cartItems em localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        //adiociona o novo item no final do array em cartItems
        return {...state, cart:{...state.cart, cartItems}}
      //retorna todos os itens menos o item passado em action.payload
      case "CART_REMOVE_ITEM": {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        //usa JSON.stringify para converter cartItems em string e salvar cartItems atualizado em localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      //atualiza userInfo com os dados recebidos do backend
      case "USER_SIGNIN":
        return { ...state, userInfo: action.payload };
        case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
      case "SAVE_SHIPPING_ADDRESS":
        return {
          ...state,
          cart: { ...state.cart, shippingAddress: action.payload },
        };
        case 'SAVE_PAYMENT_METHOD':
          return {
            ...state,
            cart: { ...state.cart, paymentMethod: action.payload },
          };
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