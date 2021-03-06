<template>
  <v-card class="text-center elevation-0">
    <v-row>
      <v-col cols="12" md="6">
        <v-card-title class="primary--text d-block mx-auto headline">
          {{ book.title }}
        </v-card-title>
        <p>{{ book.category }}</p>
        <v-img
          :src="book.coverImage"
          lazy-src="/placeholder.png"
          style="max-width: 300px;max-height: 600px;"
          class="p-10 mx-auto"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="mt-md-10">
        <h3>{{ book.author }}</h3>
        <h4>{{ book.price + " L.E." }}</h4>
        <v-card-text>
          <p v-html="book.description"></p>
        </v-card-text>
        <v-card-actions>
          <AddToCart
            :block="true"
            :title="book.title"
            :coverImage="book.coverImage"
            :price="book.price"
            :id="book._id"
          />
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AddToCart from "~/components/AddToCart";

export default {
  data() {
    return {
      book: {}
    };
  },
  async fetch() {
    const data = await this.$axios.$get(`/api/books/${this.$route.params.id}`);
    this.book = data;
  },
  components: { AddToCart }
};
</script>
