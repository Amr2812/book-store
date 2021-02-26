<template>
  <section class="container">
    <div>
      <h1>
        {{ error.statusCode }}
      </h1>
      <h2>
        {{ error.message }}
      </h2>
      <v-btn v-if="error.statusCode === 404" color="error" class="mt-2" to="/">
        Homepage
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
