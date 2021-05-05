import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "vuex",
    storage: window.localStorage,
    modules: ["cart"]
  }).plugin(store);
};
