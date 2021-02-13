<template>
  <v-row justify="center" align="center" style="min-height: 60vh">
    <v-col cols="12" md="6" class="text-center text-md-left">
      <h1 class="primary--text display-1 mb-3 mt-6">
        About <strong>Bookery</strong> Store
      </h1>
      <p>
        Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Eius
        doloribus accusantium, distinctio rerum dolores officiis neque vitae
        provident enim in veritatis porro sint.
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod culpa
        placeat impedit itaque vero natus!
      </p>
      <v-btn color="primary" class="mr-2" to="/books">Browse Library</v-btn>
      <v-btn class="primary--text" outlined to="/contact">Contact Us</v-btn>
    </v-col>
    <v-col cols="12" md="6">
      <v-img
        src="/about.svg"
        lazy-src="/books.svg"
        class="d-block mx-auto"
        style="max-width: 300px;"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>
