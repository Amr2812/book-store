<template>
  <v-row justify="center" align="center" style="min-height: 70vh;">
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="[order]"
        item-key="name"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:[`item.actions`]="{}">
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small class="mr-2" v-bind="attrs" v-on="on">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="error" dark
                  >Are you sure you want to delete this Order?</v-toolbar
                >
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Cancel</v-btn>
                  <v-btn color="primary" @click="deleteOrder()">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-for="book in order.books" :key="book._id">
      <v-card class="text-center elevation-0">
        <v-img
          :src="book.coverImage"
          lazy-src="/placeholder.png"
          style="max-width: 150px;max-height: 300px;"
          class="p-10 mx-auto"
        ></v-img>
        <v-card-title class="primary--text d-block mx-auto">
          {{ book.title }}
        </v-card-title>
        <v-card-subtitle>
          <h3>
            {{ book.quantity }}
            Book(s)
          </h3>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      headers: [
        { text: "Name", value: "name", sortable: false },
        { text: "Address", value: "address", sortable: false },
        {
          text: "Phone Number",
          value: "phoneNumber",
          sortable: false,
          align: "center"
        },
        {
          text: "Email",
          value: "email",
          sortable: false,
          align: "center"
        },
        {
          text: "Total Price (L.E.)",
          value: "totalPrice",
          sortable: false,
          align: "center"
        },
        { text: "Actions", value: "actions", sortable: false, align: "center" }
      ]
    };
  },
  async fetch() {
    const data = await this.$axios.$get(`/api/orders/${this.$route.params.id}`);
    this.order = data;
  },
  methods: {
    deleteOrder() {
      this.dialog = false;
      this.$axios
        .$delete(`/api/orders/${this.$route.params.id}`)
        .then(res => {
          this.$notifier.showMessage({
            content: res,
            color: "success"
          });
          this.$router.replace("/admins/orders");
        })
        .catch(err => {
          this.$notifier.showMessage({
            content: err,
            color: "error"
          });
        });
    }
  },
  layout: "dashboard",
  middleware: "auth"
};
</script>
