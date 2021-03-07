<template>
  <v-card class="text-center elevation-0">
    <v-row>
      <v-col cols="12" md="6">
        
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      order: {}
    };
  },
  async fetch() {
    const data = await this.$axios.$get(`/api/orders/${this.$route.params.id}`);
    this.order = data;
  },
};
</script>
