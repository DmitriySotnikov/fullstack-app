<template>
  <div class="form">
    <div>
      <div class="form__container">
        <form
          @submit.prevent="(event) => handleSubmit({ event, email, password })"
        >
          <label for="email">Email:</label>
          <input class="form__input" id="email" v-model="email" type="text" />

          <label for="password">Пароль:</label>
          <input
            class="form__input"
            id="password"
            v-model="password"
            type="text"
          />
          <label v-if="isRegistration" for="password"
            >Подтверждение пароля:</label
          >
          <input
            class="form__input"
            v-if="isRegistration"
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            type="text"
          />
          <button class="form__button" type="submit">
            {{
              vizible
                ? "Обновить капчу"
                : isRegistration
                ? "Зарегистрироваться"
                : "Войти"
            }}
          </button>
        </form>
      </div>
      <div class="form__captcha" v-if="vizible">
        <div id="captcha" v-html="auth.captcha"></div>
        <input
          class="form__captcha_input"
          placeholder="Введите текст с капчи"
          v-model="value"
        />
        <div class="form__captcha_button-box">
          <button
            class="form__button form__captcha_button"
            @click="verifyCaptcha"
          >
            Проверить капчу
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { useToast } from "vue-toast-notification";
import { authActions } from "../config/actions";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  name: "FormComponent",
  props: {
    isRegistration: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      value: "",
      vizible: false,
    };
  },
  methods: {
    ...mapActions({
      fetchCaptcha: authActions.FETCH_CAPTCHA,
      fetchVerifyCaptcha: authActions.FETCH_VERIFY_CAPTCHA,
      login: authActions.LOGIN,
      registration: authActions.REGISTRATION,
      refresh: authActions.REFRESH_TOKEN,
    }),
    async handleSubmit({ event, email, password }) {
      ///
      event.preventDefault();
      const $toast = useToast();
      this.value = "";

      if (
        !RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)
      ) {
        $toast.error("Неверный формат почты");
        return;
      }

      if (this.isRegistration) {
        const regTest = RegExp(
          /(?=.*[0-9])(?=.*[.!@,_#$%^&*-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z.!@,_#$%^&*-]{8,30}/
        );
        if (this.password !== this.passwordConfirmation) {
          $toast.error("Пароли не совпадают");
          return;
        }
        if (
          !regTest.test(this.password) ||
          !regTest.test(this.passwordConfirmation)
        ) {
          $toast.error(
            "Пароль должен содержать 8 символов, включать как минимум 1 заглавную букву, 1 цифру и спецсимвол"
          );
          return;
        }

        if (this.auth.isCaptchaVerified) {
          this.vizible = false;
        } else {
          $toast.info("Введите капчу");
          await this.fetchCaptcha();
          this.vizible = true;
          return;
        }
      }

      const { result, error } = this.isRegistration
        ? await this.registration({ email, password })
        : await this.login({ email, password });

      if (error) {
        $toast.error(error);
        return;
      }
      if (result) {
        $toast.success("Вы успешно авторизовались");
        this.$router.push("/");
        return;
      }

      $toast.info("Введите капчу");
      this.vizible = true;
    },
    async verifyCaptcha() {
      ///
      const $toast = useToast();
      const { isVerify, error } = await this.fetchVerifyCaptcha({
        captchaValue: this.value,
      });
      if (error) {
        $toast.error(error);
      }
      if (this.auth.isCaptchaVerified) {
        this.vizible = false;
      } else {
        if (this.isRegistration) {
          this.value = "";
          await this.fetchCaptcha();
        } else {
          this.value = "";
          await this.login({ email, password });
        }
      }
    },
  },
  computed: {
    ...mapState(["auth"]),
  },
  // mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 300px;
}
label {
  font-size: 18px;
  font-weight: 500;
}
button:hover {
  background-color: #00a4e4;
  color: #ffffff;
}
input:hover {
  background-color: rgba(0, 0, 0, 0.16);
}
.form {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
  &__title {
    font-size: 21px;
    font-weight: 500;
    padding: 15px 0;
  }
  &__button {
    height: 45px;
    cursor: pointer;
    border-radius: 0.375rem;
    background-color: #00bbff;
    border-color: #00bbff;
    border-width: 0;
    color: #ffffff;
    display: block;
    margin: 0 auto;
    padding: 15px 20px;
    text-transform: uppercase;
    width: 100%;
  }
  &__input {
    border: none;
    width: 290px;
    height: 40px;
    font-size: 17px;
    border-radius: 0.375rem;
    padding: 0 5px;
    background: rgb(239, 239, 239);
  }
  &__input:focus {
    outline: none;
  }
  &__captcha {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    &_input {
      font-size: 17px;
      border: none;
      text-align: center;
      width: 190px;
      height: 40px;
      border-radius: 0.375rem;
      padding: 0 5px;
      background: rgb(239, 239, 239);
      margin: 0 0 7px 0;
      &:focus {
        outline: none;
      }
    }
    &_button {
      height: 40px;
      padding: 10px 20px;
    }
    &_button-box {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
