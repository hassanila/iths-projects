import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from 'vuex'

import "./assets/main.css";

const app = createApp(App);

const store = createStore({
  strict: true,
  mutations: {
    increaseNumber(state) {
      state.nr++;
    }
  },
  state: {
    nr: 1,
  }
})

app.use(store)


app.use(router);

app.mount("#app");
