<template>
  <v-row>
    <v-col>
      <v-form ref="admin" lazy-validation>
        <h1 class="primary--text mb-3 text-center">New Admin</h1>
        <v-text-field
          v-model="admin.name"
          :rules="[v => !!v || 'Name is required']"
          label="Name"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="admin.email"
          label="Email"
          :rules="[
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
          ]"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="admin.password"
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
          filled
        ></v-text-field>
        <v-btn
          color="success"
          type="submit"
          @click.prevent="createAdmin()"
          :loading="loading"
          >Submit</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        name: "",
        email: "",
        password: ""
      },
      showPass: false,
      loading: false
    };
  },
  methods: {
    async createAdmin() {
      if (this.$refs.admin.validate()) {
        try {
          this.loading = true;
          const res = await this.$axios.$post("/api/admins/new", this.admin);
          this.loading = false;
          if (res.errors) {
            this.$notifier.showMessage({
              content: res.errors[0].msg,
              color: "error"
            });
          } else {
            this.$notifier.showMessage({
              content: res,
              color: "success"
            });
            this.$refs.admin.reset();
          }
        } catch (err) {
          this.loading = false;
          this.$notifier.showMessage({
            content: err,
            color: "error"
          });
        }
      }
    }
  },
  layout: "dashboard",
  middleware: "auth"
};
</script>
