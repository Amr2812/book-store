<template>
  <div>
    <v-row justify="center" align="center">
      <v-col class="text-center">
        <img src="/logo.png" width="200px" />
        <h1 class="primary--text"><strong>Azzbakeya Delivery</strong></h1>
        <p class="mb-5">
          We are an International Book Store that Sells Millions of Books Every
          Year. We Sell all kinds of Books and all Categories.
        </p>
        <v-text-field
          v-model="searchQuery"
          label="Search Library"
          filled
          rounded
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="$router.push(`/search?q=${searchQuery}`)"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        sm="6"
        md="4"
        class="mx-auto"
        v-for="number in 6"
        :key="number"
        v-show="loading"
      >
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        sm="6"
        md="4"
        class="mx-auto"
        v-for="book in books"
        :key="book._id"
      >
        <Product
          :coverImage="book.coverImage"
          :title="book.title"
          :id="book._id"
          :price="book.price"
          :shortDescription="book.shortDescription"
        />
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
      categories: [
        "Novels",
        "Literature",
        "News & Magazines",
        "Biography",
        "Science & Technology",
        "Art & Design",
        "Health & Fitness",
        "Medical",
        "Sports",
        "Social",
        "Life",
        "Kids",
        "Money",
        "Philosiphy",
        "Other"
      ],
      books: [],
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
      },
      loading: true
    };
  },
  async fetch() {
    const books = await this.$axios.$get("/api/books");
    this.loading = false;
    this.books = books;
  },
  components: { Product }
};
</script>
