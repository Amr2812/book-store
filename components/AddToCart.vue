<template>
  <v-btn color="primary" @click="addToCart" :block="block">Add TO Cart</v-btn>
</template>

<script>
export default {
  name: "AddToCart",
  props: {
    title: String,
    price: Number,
    coverImage: String,
    id: String,
    block: Boolean
  },
  data() {
    return {
      item: {
        title: this.title,
        coverImage: this.coverImage,
        price: this.price,
        id: this.id,
        quantity: 1
      }
    };
  },
  methods: {
    async addToCart() {
      await this.$store.commit("cart/addToCart", this.item);
      this.$notifier.showMessage({
        content: "Book has been added to Cart Successfully",
        color: "success"
      });
    }
  }
};
</script>
