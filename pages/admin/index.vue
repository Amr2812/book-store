<template>
  <v-row justify="center" align="center" style="min-height: 60vh">
    <v-col style="max-width: 500px;">
      <v-form
        class="mb-5 text-center mx-auto elevation-2 pa-5"
        ref="form"
        lazy-validation
        @submit.prevent="submit()"
      >
        <h1 class="primary--text">Login</h1>
        <v-text-field
          label="Email"
          name="Email"
          v-model="login.email"
          :rules="emailRules"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          :rules="[v => !!v || 'Password is required']"
          name="Phone Number"
          label="Phone Number"
          type="password"
          outlined
        ></v-text-field>
        <v-btn color="success" type="submit">Submit</v-btn>
      </v-form>
    </v-col>
    <v-snackbar top v-model="snackbar" class="white--text" :timeout="5000">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      snackbar: false,
      snackbarMessage: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
      }
    }
  }
};
</script>
