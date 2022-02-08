import { createStore } from "vuex";

export default createStore({
  state: {
    serverURL: "http://127.0.0.1:8080",
    user_type: "",
    show: false,
    sign: false,
  },
  getters: {
    Get_Type: (state) => {
      return state.user_type;
    },
  },
  mutations: {
    // changeName(state, payload) {
    //   state.user.cart.push(payload.cart_id);
    // },
    changeType(state, payload) {
      state.user_type = payload.usertype;
      if (payload.usertype == "employee") {
        this.state.show = true;
        this.state.sign = true;
      } else if (payload.usertype == "customer") {
        this.state.show = false;
        this.state.sign = true;
      } else {
        this.state.show = false;
        this.state.sign = false;
      }
    },
  },
  actions: {},
  modules: {},
});
