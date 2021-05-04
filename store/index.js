export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie && req.headers.cookie.includes("connect.sid=")) {
      commit("auth/isAuthenticated", true);
    } else {
      commit("auth/isAuthenticated", false);
    }
  }
};
