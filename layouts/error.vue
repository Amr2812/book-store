<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 class="text-center error--text display-4">
          {{ error.statusCode }}
        </h1>
        <h2 class="text-center">
          {{ error.message }}
        </h2>
        <v-btn
          v-if="error.statusCode === 404"
          color="error"
          class="mt-2"
          to="/"
        >
          Homepage
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
