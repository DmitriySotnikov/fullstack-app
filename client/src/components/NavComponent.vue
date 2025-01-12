<template>
  <div>
    <nav>
      <router-link to="/login">Вход</router-link> |
      <router-link to="/registration">Регистрация</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "NavComponent",
  computed: {
    ...mapState(["auth"]),
  },
});
</script>
