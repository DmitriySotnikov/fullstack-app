<template>
  <div class="home">
    <div>
      <h1>Home page</h1>
      <div class="wellcom_img">
        <img src="../assets/wellcom.jpg" alt="wellcom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped lang="scss">
.wellcom_img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  img {
    width: 900px;
    height: 900px;
  }
}
</style>