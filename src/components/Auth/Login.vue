<template>
  <div>
    <LoadingIcon :loading="loading"></LoadingIcon>
    <AlertMessage
      ref="alertcomp"
      variant="warning"
      :message="errormessage"
    ></AlertMessage>

    <b-form id="loginform" @submit="onSubmit" ref="form">
      <b-input-group id="field1" class="mb-2">
        <InputField
          v-model="user.email"
          :class="{ invalid: $v.user.email.$error }"
          @blur="$v.user.email.$touch()"
          type="email"
          placeholder="Email"
        ></InputField>
        <p class="feedback" v-if="!$v.user.email.email">
          Please provide a valid email address
        </p>
        <p
          class="feedback"
          v-if="!$v.user.email.required && $v.user.email.$anyError"
        >
          Email cannot be empty
        </p>
      </b-input-group>

      <InputField
        type="password"
        v-model="user.password"
        placeholder="Password"
        :class="{ invalid: $v.user.password.$error }"
        @blur="$v.user.password.$touch()"
        @visited="setVisited"
      ></InputField>

      <div id="loginbtn">
        <b-button variant="primary" type="submit" :disabled="$v.$invalid"
          >Login</b-button
        >
      </div>
    </b-form>
    <p>
      Not registered yet? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import InputField from "../Forms/Input/InputText.vue";
import AlertMessage from "../Utils/AlertMessage.vue";

export default {
  name: "LoginPage",
  components: { InputField, AlertMessage },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      touched: false,
      error: false,
      errormessage: "",
      loading: false,
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    showToast() {
      this.errormessage = "Email or password entered is incorrect";
      this.$refs.alertcomp.showAlert();
    },
    async onSubmit(e) {
      const userCred = JSON.parse(JSON.stringify(this.user));
      e.preventDefault();
      try {
        this.loading = true;
        const uid = await this.$store.dispatch("login", userCred);

        if (uid) this.$router.push({ path: "/oncampus" });
      } catch (err) {
        const { status } = err.response;
        if (this.$refs.form) this.$refs.form.reset();

        if (status == 401) this.errormessage = "Email or Password entered is incorrect";
        else if (status == 500) this.errormessage = "Server issue ,Try again";
        this.showToast();
      } finally {
        this.loading = false;
      }
    },

    setVisited() {
      this.touched = true;
    },
  },
};
</script>

<style>
#loginform {
  padding: 15px;

  background-color: white;
  border-radius: 10px;
}

#loginform input {
}

#field1 {
  margin-bottom: 20px;
}

#loginbtn {
  display: flex;
  justify-content: center;
}
</style>
