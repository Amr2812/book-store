<template>
  <v-card class="text-center elevation-0 mb-4">
    <v-img
      :src="coverImage"
      lazy-src="/placeholder.png"
      style="max-width: 150px;max-height: 300px;"
      class="p-10 mx-auto"
    ></v-img>
    <v-card-title class="primary--text d-block mx-auto">
      <nuxt-link :to="`/book/${id}`" class="text-decoration-none">
        {{ title | sliceTitle }}
      </nuxt-link>
    </v-card-title>
    <v-card-subtitle class="pb-2">
      {{ price + " L.E." }}
    </v-card-subtitle>
    <v-card-text class="pb-0">
      <p>{{ shortDescription | sliceShortDescription }}</p>
    </v-card-text>
    <v-card-actions class="d-block mx-auto pt-0">
      <AddToCart
        :block="false"
        :title="title"
        :coverImage="coverImage"
        :price="price"
        :id="id"
      />
      <v-btn text color="primary" :to="`/book/${id}`">View more</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AddToCart from "~/components/AddToCart";

export default {
  name: "Product",
  props: ["coverImage", "title", "id", "price", "shortDescription"],
  filters: {
    sliceShortDescription(text) {
      if (text) return text.slice(0, 150) + "...";
    },
    sliceTitle(text) {
      if (text) {
        if (text.length > 24) {
          return text.slice(0, 35) + "..";
        } else {
          return text;
        }
      }
    }
  },
  components: { AddToCart }
};
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
