<script setup>
import IconPlus from './icons/IconPlus.vue'
import BarcodeScanner from './BarcodeScanner.vue'
</script>

<template>
  <article class="library__add-book">
    <div class="add-book_header">
      <IconPlus />
      <span class="add-book">Add a Book to the Library</span>
    </div>
    <BarcodeScanner/>
    <div >
      <Form @submit="handleAddBook" :validation-schema="schema">
      <div id="title-field" class="form-group">
        <label for="title">Title:</label>
        <Field id="title-input-field" name="title" type="text" v-model="scannedTitle" class="form-control" />
        <ErrorMessage name="title" class="error-feedback" />
      </div>
      <div id="author-field" class="form-group">
        <label for="author">Author:</label>
        <Field id="author-input-field" name="author" type="author" v-model="scannedAuthor" class="form-control" />
        <ErrorMessage name="author" class="error-feedback" />
      </div>
      <div id="isbn-field" class="form-group">
        <label for="isbn">ISBN:</label>
        <Field id="isbn-input-field" name="isbn" type="text" v-model="scannedIsbn" class="form-control" />
        <ErrorMessage name="isbn" class="error-feedback" />
      </div>
      <div id="description-field" class="form-group">
        <label for="description">Description:</label>
        <Field id="description-input-field" name="description" v-model="scannedDescription" type="description" class="form-control" />
        <ErrorMessage name="description" class="error-feedback" />
      </div>

      <div class="form-group">
        <button id="login-button" class="btn btn-primary btn-block">
          <span id="test-add-book-button">Add Book</span>
        </button>
      </div>

      <div class="form-group">
        <div id="login-error-message" v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
    </div>
  </article>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "AddNewBook",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    scannedTitle() {
      return this.$store.state.books.addedBookInfo.title
    },
    scannedAuthor() {
      return this.$store.state.books.addedBookInfo.author
    },
    scannedIsbn() {
      return this.$store.state.books.addedBookInfo.isbn
    },
    scannedDescription() {
      return this.$store.state.books.addedBookInfo.description
    }
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string().required("Title required"),
      author: yup.string().required("Author required"),
      isbn: yup.string().required("Isbn required"),
      description: yup.string().required("Description required"),
    });
    return {
      message: "",
      schema,
    };
  },
  methods: {
    handleAddBook(book) {
      this.$store.dispatch("books/addBook", book)
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.add-book_header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.add-book {
  margin-left: 16px;
  color: #565656;
}

.error-feedback {
  color: red;
}

.collapsible {
  cursor: pointer;
  padding: 18px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  cursor: pointer;
}

.button-content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: rgb(32, 40, 48);
  width: 95%;
  max-width: 1400px;
  color: white;

}

.drop-down {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border-color: rgb(31, 76, 152);
  background-color: rgb(31, 76, 152);
  margin-left: auto;

}

.drop-down-image {
  transition: transform 0.4s;
  transform-style: preserve-3d;
}

.drop-down-image.is-flipped {
  transform: rotateX(180deg);
}

.drop-down:hover {
  background-color: rgb(56, 109, 174);
  border-color: rgb(56, 109, 174);
  transform: scale(-1);
  -webkit-transform: scaleX(-1);
}
</style>