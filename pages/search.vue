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
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular
          :indeterminate="true"
          color="secondary"
        ></v-progress-circular>
      </v-col>
      <v-col
        v-for="book in books"
        :key="book._id"
        cols="12"
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
      <v-col v-show="!books || books.length < 1">
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
      searchQuery: null,
      books: null,
      loading: false
    };
  },
  watch: {
    "$route.query": "$fetch"
  },
  async fetch() {
    if (this.searchQuery) {
      this.loading = true;
      const data = await this.$axios.$get(
        `/api/search?q=${this.$route.query.q}`
      );
      this.loading = false;
      this.books = data;
    }
  },
  mounted() {
    this.searchQuery = this.$route.query.q;
  },
  components: { Product }
};
</script>
