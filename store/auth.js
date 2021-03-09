export const state = () => ({
  isAuthenticated: false
});

export const mutations = {
  isAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.isAuthenticated()) {
      commit("isAuthenticated", true);
    }
  },
};
