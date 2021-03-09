<template>
  <v-row>
    <v-col>
      <v-form ref="order" lazy-validation>
        <h1 class="primary--text mb-3 text-center">Place An Order</h1>
        <v-text-field
          v-model="order.name"
          :rules="[v => !!v || 'Name is required']"
          label="Name"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="order.email"
          :rules="[
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
          ]"
          label="Email"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="order.phoneNumber"
          :rules="[v => !!v || 'Phone Number is required']"
          label="Phone Number"
          type="number"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="order.address"
          :rules="[v => !!v || 'Address is required']"
          label="Address"
          required
          filled
        ></v-text-field>
        <v-text-field
          label="Total Price"
          disabled
          :value="$store.getters['cart/totalPrice'] + ' L.E.'"
        ></v-text-field>
        <v-btn
          color="success"
          type="submit"
          @click.prevent="submitOrder()"
          :loading="loading"
          >Submit</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      order: {
        name: "",
        email: "",
        phoneNumber: Number,
        totalPrice: Number,
        address: "",
        books: []
      },
      loading: false
    };
  },
  mounted() {
    this.$store.state.cart.cart.forEach(item => {
      const book = {
        title: item.title,
        coverImage: item.coverImage,
        quantity: item.quantity
      };
      this.order.books.push(book);
    });
    this.order.totalPrice = this.$store.getters['cart/totalPrice'];
  },
  methods: {
    async submitOrder() {
      if (this.$refs.order.validate()) {
        try {
          this.loading = true;
          await this.$axios.post("/api/orders", this.order);
          this.loading = false;
          this.$notifier.showMessage({
            content: "Order Submitted! We'll contact you!",
            color: "success"
          });
          this.$refs.order.reset();
        } catch (err) {
          this.loading = false;
          this.$notifier.showMessage({
            content: err,
            color: "error"
          });
        }
      }
    }
  }
};
</script>
