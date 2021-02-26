<template>
  <v-row justify="center" align="center" style="min-height: 10vh">
    <v-col>
      <v-text-field
        v-model="searchQuery"
        label="Search Library"
        filled
        rounded
        prepend-inner-icon="mdi-magnify"
        @keyup.enter="search"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
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
    const res = await this.$axios.get(`/api/search?q=${this.$route.query.q}`);
    this.books = res.data;
},
  methods: {
    search() {
      this.$router.replace(`/search?q=${this.searchQuery}`);
    }
  }
};
</script>
