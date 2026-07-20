import {createSlice} from "@reduxjs/toolkit";

const getCartItems = () => {
    const savedItems = localStorage.getItem("cartItems");
    if (!savedItems) return [];

    try {
        return JSON.parse(savedItems).map((item) => ({
            ...item,
            id: item.id || item.productId,
            productId: item.productId || item.id,
            qty: item.qty || item.quantity || 1,
        }));
    } catch (error) {
        localStorage.removeItem("cartItems");
        return [];
    }
};

const initialState = {
    cartItems: getCartItems(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState ,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.qty += 1;
            }
            else {
                state.cartItems.push({
                    ...item,
                    id: item.id || item.productId,
                    productId: item.productId || item.id,
                    qty: item.qty || 1
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        updateCartQty: (state, action) => {
            const { id, qty } = action.payload;
            if (qty < 1) {
                state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id && cartItem.productId !== id);
            } else {
                const existingItem = state.cartItems.find((cartItem) => cartItem.id === id || cartItem.productId === id);
                if (existingItem) {
                    existingItem.qty = qty;
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId && cartItem.productId !== itemId);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        }
    }
});

export const {addToCart, updateCartQty, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
