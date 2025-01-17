import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import axiosInstance from "./api/axios";

const app = createApp(App)
  //
  .use(router)
  .use(store)
  .use(ToastPlugin);
// .mount("#app");

// Добавляем $api для удобства использования в компонентах
app.config.globalProperties.$api = axiosInstance; // this.$api.get('/endpoint')

app.mount("#app");
