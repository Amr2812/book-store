<template>
  <v-row justify="center" align="center" style="min-height: 60vh">
    <v-col style="max-width: 500px;">
      <v-form
        class="mb-5 text-center mx-auto elevation-2 pa-5"
        ref="login"
        lazy-validation
        @submit.prevent="submit()"
      >
        <h1 class="primary--text mb-2">Login</h1>
        <v-text-field
          label="Email"
          name="Email"
          v-model="login.email"
          :rules="[
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
          ]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          label="Password"
          hint="At least 6 characters"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          :rules="[
            value => !!value || 'Password is Required.',
            v => !!v && v.length >= 6 || 'Min 6 characters'
          ]"
          required
          outlined
        ></v-text-field>
        <v-btn color="success" type="submit" :loading="loading">Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      errors: [],
      showPass: false,
      loading: false
    };
  },
  methods: {
    async submit() {
      if (this.$refs.login.validate()) {
        try {
          this.loading = true;
          await this.$axios.$post("/api/admins/login", this.login);
          await this.$store.commit("auth/isAuthenticated", true);
          await this.$router.push("/admin/books");
          this.loading = false;
        } catch (err) {
          this.loading = false;
          this.$notifier.showMessage({
            content: "Incorrect Email or Password",
            color: "error"
          });
        }
      }
    }
  }
};
</script>
