import { createStore } from "vuex";

export default createStore({
  state: {
    serverURL: "http://127.0.0.1:8080",
    user_type: "",
    products: [],
    show: false,
    sign: false,
    man: false,
    email_crt:"",
    page_num: 0,
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
      if (payload.usertype == "manager") {
        this.state.show = false;
        this.state.sign = true;
        this.state.man = true;
      }
      else if (payload.usertype == "employee") {
        this.state.show = true;
        this.state.sign = true;
        this.state.man = false;
      } else if (payload.usertype == "customer") {
        this.state.show = false;
        this.state.sign = true;
        this.state.man = false;
      } else {
        this.state.show = false;
        this.state.sign = false;
        this.state.man = false;
      }
    },
  },
  actions: {},
  modules: {},
});
