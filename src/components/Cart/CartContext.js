import React from "react";
import Axios from "axios"

export const CartContext = React.createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let addedItem = action.payload
            // let addedItem = state.items.find(item=> item.id === action.payload.id)

            let existingItems = state.currentCart.find(item => action.payload.id === item.id)

            if (existingItems) {
                addedItem.quantity += 1
                return {
                    ...state,
                    currentCart: state.currentCart,
                    cartCount: state.currentCart.length,
                    totalPrice: state.totalPrice + addedItem.price,
                }
            }
            else {
                addedItem.quantity = 1;

                let newTotal = state.totalPrice + addedItem.price

                return {
                    ...state,
                    currentCart: [...state.currentCart, addedItem],
                    cartCount: state.currentCart.length + 1,
                    totalPrice: newTotal
                }
            }
            
        case "REMOVE_FROM_CART":
            let itemToRemove = state.currentCart.find((item) => item.id === action.payload.id)
            let newItems = state.currentCart.filter((item) => item.id !== action.payload.id)

            let newTotal = state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
            return { 
                ...state,
                currentCart: newItems,
                cartCount: state.currentCart.length - 1,
                totalPrice : newTotal
            }
        case "ADD_QTY":
            action.payload.quantity += 1

            return{
              ...state,
              totalPrice: state.totalPrice + action.payload.price
            }
        case "SUB_QTY":
            if(action.payload.quantity === 1){
            return{
                ...state,
                currentCart: state.currentCart.filter(item=>item.id !== action.payload.id),
                totalPrice: state.totalPrice - action.payload.price,
                cartCount: state.currentCart.length - 1,
            }
        }
        else {
            action.payload.quantity -= 1
            return{
                ...state,
                totalPrice: state.totalPrice - action.payload.price
            }
        }
        default:
            throw new Error();
    }
}

export const CartProvider = (props) => {
    // const [cart, setCart] = React.useState([]);
    const [cart, dispatchCart] = React.useReducer(cartReducer, {
        currentCart: [],
        cartCount: 0,
        totalPrice: 0,
    })
    return (
        <CartContext.Provider value={[cart, dispatchCart]}>
            {props.children}
        </CartContext.Provider>
    );
};
