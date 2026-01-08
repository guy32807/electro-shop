export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {

    //Calculate items price and quantity    
    state.itemsPrice = addDecimals(state.cartItems.reduce((total, item) => total + item.price * item.qty, 0))
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    //Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(state))
    localStorage.setItem('cartTotalAmount', state.totalPrice)
    localStorage.setItem('cartTotalQuantity', state.cartItems.reduce((total, item) => total + item.qty, 0))

    return state;
}