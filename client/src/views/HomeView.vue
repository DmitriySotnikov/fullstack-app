<template>
  <div class="home">
    <div>
      <div class="home__btn-box">
        <div class="home__title">
          <h1>Home page</h1>
        </div>
        <div>
          <button class="home__logout-btn" @click="logoutHandler">
            Logout
          </button>
        </div>
      </div>
      <div class="home__wellcom_img">
        <img src="../assets/wellcom.jpg" alt="wellcom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { authActions } from "@/config/actions";

export default defineComponent({
  name: "HomeView",
  methods: {
    ...mapActions({
      logout: authActions.LOGOUT,
    }),
    async logoutHandler() {
      const resust = await this.logout();
      if (resust) {
        this.$router.push({ name: "login" });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  &__title {
    width: 100%;
    padding: 0 0 0 120px;
  }
  &__wellcom_img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
      width: 900px;
      height: 900px;
    }
  }
  &__btn-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__logout-btn {
    height: 45px;
    width: 120px;
    cursor: pointer;
    border-radius: 0.375rem;
    background-color: rgb(0, 187, 255);
    border-color: rgb(0, 187, 255);
    border-width: 0;
    color: #ffffff;
    display: block;
    margin: 0 auto;
    padding: 15px 20px;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(0, 187, 255, 0.8);
    }
  }
}
</style>
