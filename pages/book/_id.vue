<template>
  <div>
    <v-card class="text-center elevation-0">
      <v-row>
        <v-col cols="12" sm="6">
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
        <v-col cols="12" sm="6" class="mt-sm-10">
          <h3><i class="grey--text">By:</i> {{ book.author }}</h3>
          <h4>{{ book.price + " L.E." }}</h4>
          <v-card-text>
            <client-only>
              <p v-html="book.description"></p>
            </client-only>
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
      <v-divider class="mt-3"></v-divider>
    </v-card>
    <h1 class="mt-8 grey--text text-decoration-underline text-center">Related Books</h1>
    <v-row class="mt-5" justify="center" align="center">
      <v-col
        sm="6"
        md="4"
        class="mx-auto"
        v-for="book in relatedBooks"
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
import AddToCart from "~/components/AddToCart";
import Product from "~/components/Product";

export default {
  async asyncData({ $axios, route }) {
    const book = await $axios.$get(`/api/books/${route.params.id}`);
    const relatedBooks = await $axios.$get(
      `/api/related/${route.params.id}?category=${book.category}`
    );
    return { book, relatedBooks };
  },
  head() {
    return {
      title: this.book.title + " - Azbakeya Delivery",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.book.title
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.book.shortDescription
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.book.coverImage
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.book.title
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.book.title
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.book.shortDescription
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.book.coverImage
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.book.coverImage
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.book.title
        }
      ]
    };
  },
  components: { AddToCart, Product }
};
</script>
