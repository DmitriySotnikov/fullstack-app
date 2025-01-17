import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import store from "@/store";
import LoginView from "@/views/LoginView.vue";
import RegistrationVue from "@/views/Registration.vue";
import { authActions } from "@/config/actions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true }, // Требуется аутентификация
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

router.beforeEach(async (to, from, next) => {
  const storeWithType = store as any;

  // Инициализируем авторизацию перед первым роутом
  if (
    // todo
    // !storeWithType.state.auth.user &&
    !storeWithType.state.auth.isAuthenticated
  ) {
    await store.dispatch(authActions.GET_USER_DATE);
  }
 
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.name === "login") {
    next();
  } else if (to.name === "registration") {
    next();
  } else if (to.meta.requiresAuth && isAuthenticated) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
