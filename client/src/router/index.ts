import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import store from "@/store";
import LoginView from "@/views/LoginView.vue";
import RegistrationVue from "@/views/Registration.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else if (to.name === "registration") {
    next();
  } else if ((store.state as any).auth.isAuthenticated) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
