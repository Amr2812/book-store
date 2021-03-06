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
  addToCart(state, payload) {
    let found = state.cart.find(product => product.id == payload.id);

    if (found) {
      found.quantity++;
    } else {
      state.cart.push(payload);
    }
  },
  removeFromCart(state, payload) {
    let index = state.cart.indexOf(payload);
    state.cart.splice(index, 1);
  },
  decreaseQuantity(state, payload) {
    if (payload.quantity > 1) {
      payload.quantity--;
    } else {
      let index = state.cart.indexOf(payload);
      state.cart.splice(index, 1);
    }
  },
  increaseQuantity(state, payload) {
    payload.quantity++;
  }
};
