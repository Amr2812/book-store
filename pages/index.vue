<template>
  <div>
    <v-row justify="center" align="center">
      <v-col class="text-center">
        <h1 class="primary--text"><strong>Azzbakeya Books</strong></h1>
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
        v-for="book in books.reverse()"
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
      books: []
    };
  },
  async fetch() {
    const data = await this.$axios.$get("/api/books");
    this.books = data;
  },
  components: { Product }
};
</script>
