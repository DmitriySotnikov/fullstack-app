import { createStore } from "vuex";
import { authModule } from "./userAuth/authModule";

export default createStore({
  modules: { auth: authModule },
});
