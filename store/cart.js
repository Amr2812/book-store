let cart = null;

export const state = () => ({
  cart: cart ? cart : []
});

export const getters = {
  totalPrice(state) {
    let total = 0;
    state.cart.filter(item => {
      total += item.price * item.quantity;
    });

    return total;
  }
};

export const mutations = {
  addToCart(state, item) {
    let found = state.cart.find(product => product.id == item.id);

    if (found) {
      found.quantity++;
    } else {
      state.cart.push(item);
    }
  },
  removeFromCart(state, item) {
    let index = state.cart.indexOf(item);
    state.cart.splice(index, 1);
  },
};
