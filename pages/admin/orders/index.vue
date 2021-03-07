<template>
  <v-row justify="center" align="center" class="mt-5">
    <v-col cols="12">
      <h1 class="text-center primary--text">Orders</h1>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="orders"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filter"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon small class="mr-2" :to="'orders/' + item._id">
          <v-icon small>
            mdi-open-in-new
          </v-icon>
        </v-btn>
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
                <v-btn color="primary" @click="deleteOrder(item)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" }
      ],
      orders: [],
      dialog: false
    };
  },
  async fetch() {
    const data = await this.$axios.$get("/api/orders");
    this.orders = data;
  },
  methods: {
    filter(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      );
    },
    deleteOrder(item) {
      this.dialog = false;
      this.$axios
        .$delete(`/api/orders/${item._id}`)
        .then(res => {
          this.$notifier.showMessage({
            content: res,
            color: "success"
          });
          this.$fetch();
        })
        .catch(err => {
          this.$notifier.showMessage({
            content: err,
            color: "error"
          });
        });
    }
  },
  layout: "admin"
};
</script>
