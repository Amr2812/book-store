<template>
  <v-form
    class="mb-5 text-center mx-auto elevation-2 pa-5"
    ref="editBook"
    @submit.prevent="submit()"
  >
    <v-row justify="center" align="center" style="min-height: 60vh">
      <v-col cols="12">
        <h1 class="primary--text">Edit Book</h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Title"
          v-model="book.title"
          rounded
          outlined
          :rules="[v => !!v || 'Title is required']"
        ></v-text-field>
        <v-text-field
          label="Author"
          v-model="book.author"
          rounded
          outlined
          :rules="[v => !!v || 'Author is required']"
        ></v-text-field>
        <v-text-field
          label="Price"
          type="number"
          v-model="book.price"
          rounded
          outlined
          :rules="[v => !!v || 'Price is required']"
        ></v-text-field>
        <v-text-field
          label="Pages Count"
          type="number"
          v-model="book.pagesCount"
          rounded
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="categories"
          label="Category"
          v-model="book.category"
          outlined
          rounded
          :rules="[v => !!v || 'Category is required']"
        ></v-select>
        <v-textarea
          outlined
          label="Short Description"
          v-model="book.shortDescription"
          :rules="[v => !!v || 'Short Description is required']"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <wysiwyg
          v-model="book.description"
          placeholder="Description"
          :rules="[v => !!v || 'Description is required']"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          accept="image/*"
          label="Book Cover"
          @change="fileUpload"
        ></v-file-input>
        <v-progress-circular
          v-if="uploadingImage"
          indeterminate
          color="primary"
          class="my-2"
        ></v-progress-circular>
        <v-img
          :v-if="selectedImage"
          :src="selectedImage"
          :lazy-src="selectedImage"
          style="max-width: 100px;max-height: 150px;"
          class="mx-auto"
        ></v-img>
      </v-col>
      <v-btn color="success" type="submit" :loading="loading" block
        >Edit Book</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      book: {},
      categories: [
        "Novels",
        "Literature",
        "News & Magazines",
        "Biography",
        "Science & Technology",
        "Art & Design",
        "Health & Fitness",
        "Medical",
        "Sports",
        "Social",
        "Life",
        "Kids",
        "Money",
        "Philosiphy",
        "Other"
      ],
      selectedImage: null,
      uploadingImage: false,
      deletingImage: false,
      loading: false
    };
  },
  async fetch() {
    try {
      const book = await this.$axios.get(`/api/books/${this.$route.params.id}`);
      this.book = book.data;
      this.selectedImage = book.data.coverImage;
    } catch (err) {
      this.$notifier.showMessage({
        content: err,
        color: "error"
      });
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        const res = await this.$axios.patch(
          `/api/books/${this.$route.params.id}`,
          this.book
        );
        this.$notifier.showMessage({
          content: "Book has been updated Successfully",
          color: "success"
        });
        this.loading = false;
      } catch (err) {
        this.$notifier.showMessage({
          content: err,
          color: "error"
        });
        this.loading = false;
      }
    },
    fileUpload(file) {
      if (file) {
        let reader = new FileReader();

        reader.onload = async e => {
          this.selectedImage = e.target.result;
          this.uploadingImage = true;
          const instance = await this.$cloudinary.upload(e.target.result, {
            folder: "book-store",
            upload_preset: "uc1sx4v1"
          });
          this.book.coverImage = instance.secure_url;
          this.uploadingImage = false;
        };
        reader.readAsDataURL(file);
      }
    }
  },
  layout: "admin"
};
</script>
