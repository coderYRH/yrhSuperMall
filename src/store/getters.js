export default {
    getCartCount(state) {
        return state.cartList.length
    },
    cartList(state) {
        return state.cartList
    }
}