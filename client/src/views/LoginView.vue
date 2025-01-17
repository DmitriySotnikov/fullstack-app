<template>
  <div>
    <NavComponent v-if="!auth.isAuth" />
    <FormComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import FormComponent from "@/components/FormComponent.vue";
import NavComponent from "@/components/NavComponent.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    FormComponent,
    NavComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["auth"]),
  },
});
</script>
