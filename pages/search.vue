<template>
  <div>
    <v-row justify="center" align="center" style="min-height: 20vh">
      <v-col>
        <v-text-field
          v-model="searchQuery"
          label="Search Library"
          filled
          rounded
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="
            $router.replace(`/search?q=${searchQuery}`).catch(() => {})
          "
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="books.length > 0"
        :v-for="book in books"
        sm="6"
        md="4"
        class="mx-auto"
      >
        <Product
          :title="book.title"
          :coverImage="book.coverImage"
          :price="book.price"
          :shortDescription="book.shortDescription"
          :id="book._id"
        />
      </v-col>
      <v-col v-else>
        <v-img
          src="/search.svg"
          lazy-src="search.svg"
          style="max-width: 300px;"
          class="mx-auto d-block"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Product from "~/components/Product";

export default {
  data() {
    return {
      searchQuery: "",
      books: []
    };
  },
  watch: {
    "$route.query": "$fetch"
  },
  async fetch() {
    if (this.searchQuery) {
      const data = await this.$axios.$get(`/api/search?q=${this.$route.query.q}`);
      this.books = data;
    }
  },
  components: { Product }
};
</script>
