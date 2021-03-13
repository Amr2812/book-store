<template>
  <v-row justify="center" align="center" class="mt-5">
    <v-col cols="12">
      <h1 class="text-center primary--text">Books</h1>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="books"
      item-key="title"
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
        <v-btn icon small :to="`/admin/books/edit/${item._id}`">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon small @click="deleteBook(item._id)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
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
        { text: "Title", value: "title" },
        { text: "Author", value: "author" },
        { text: "Price (L.E.)", value: "price", align: "center" },
        { text: "Pages", value: "pagesCount", align: "center" },
        { text: "Category", value: "category" },
        { text: "Actions", value: "actions", sortable: false, align: "center" }
      ],
      books: [],
      dialog: false
    };
  },
  async fetch() {
    const data = await this.$axios.$get("/api/books");
    this.books = data;
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
    deleteBook(id) {
      this.dialog = false;
      this.$axios
        .$delete(`/api/books/${id}`)
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
  layout: "dashboard",
  middleware: "auth"
};
</script>
