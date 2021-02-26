<template>
  <v-row justify="center" align="center" style="min-height: 60vh">
    <v-col class="text-center">
      <h1 class="primary--text"><strong>Bookery</strong> Book Store</h1>
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
        @keyup.enter="search"
      >
      </v-text-field>
      <v-img src="/search.svg" width="300" class="d-block mx-auto"></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    search() {
      this.$router.push(`/search?q=${this.searchQuery}`)
    }
  }
};
</script>
