<template>
  <v-row justify="center">
    <v-col v-for="book in cart" :key="book.id">
      <v-card class="text-center elevation-0">
        <v-img
          :src="book.coverImage"
          lazy-src="/placeholder.png"
          style="max-width: 150px;max-height: 300px;"
          class="p-10 mx-auto"
        ></v-img>
        <v-card-title class="primary--text d-block mx-auto">
          {{ book.title }}
        </v-card-title>
        <v-card-subtitle>
          <h3>
            <v-btn icon @click="$store.commit('cart/decreaseQuantity', book)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            {{ book.quantity }}
            <v-btn icon @click="$store.commit('cart/increaseQuantity', book)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            Book(s)
          </h3>
          <strong>Total Price:</strong>
          {{ book.price * book.quantity + " L.E." }}
        </v-card-subtitle>
        <v-card-actions class="d-block mx-auto">
          <v-btn
            @click="$store.commit('cart/removeFromCart', book)"
            color="error"
            dark
            >Remove From Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        to="/order"
        block
        class="my-5"
        v-if="cart.length > 0"
        >Buy Now</v-btn
      >
    </v-col>
    <v-toolbar color="error" dark v-if="cart < 1">
      No Books In Your Cart
      <v-spacer></v-spacer>
      <v-btn text to="/">Browse Books</v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.cart = this.$store.state.cart.cart;
    }, 100);
  }
};
</script>
