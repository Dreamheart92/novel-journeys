export const calculateCartQuantityAndCost = (cart) => {
    const total = {
        quantity: 0,
        cost: 0
    }
    cart.forEach((item) => {
        total.quantity += item.quantity;
        total.cost += item.product.price * item.quantity;
    })
    return total;
}