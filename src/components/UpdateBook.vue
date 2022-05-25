<!-- <script setup>
</script> -->

<template>
  <article class="library__update-book">
    <div>
      <h4>Update Book Details</h4>
      <Form @submit="handleUpdateBook" :validation-schema="schema">
        <div id="title-field" class="form-group">
          <label for="title">Title</label>
          <Field id="title-update-field" name="title" v-model="model_title" type="text" class="form-control" />
          <!-- <ErrorMessage name="title" class="error-feedback" /> -->
        </div>
        <div id="author-field" class="form-group">
          <label for="author">Author</label>
          <Field id="author-update-field" name="author" v-model="model_author" type="author" class="form-control" />
          <!-- <ErrorMessage name="author" class="error-feedback" /> -->
        </div>
        <div id="isbn-field" class="form-group">
          <label for="isbn">Isbn</label>
          <Field id="isbn-update-field" name="isbn" v-model="model_isbn" type="text" class="form-control" />
          <!-- <ErrorMessage name="isbn" class="error-feedback" /> -->
        </div>
        <div id="description-field" class="form-group">
          <label for="description">Description</label>
          <Field id="description-update-field" name="description" v-model="model_description" type="description" class="form-control" />
          <!-- <ErrorMessage name="description" class="error-feedback" /> -->
        </div>

        <div class="form-group">
          <button id="update-button" class="btn btn-primary btn-block">
            <span id="test-update-button">Update Book</span>
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
  name: "UpdateBook",
  props: {
    book: {
        type: Object
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string().required().default(this.book.title),
      author: yup.string().required().default(this.book.author),
      isbn: yup.string().required().default(this.book.isbn),
      description: yup.string().required().default(this.book.description),
    });
    return {
      message: "",
      schema,
      model_title: this.book.title,
      model_author: this.book.author,
      model_isbn: this.book.isbn,
      model_description: this.book.description,
      id: this.book.id,
    };
  },
  methods: {
    handleUpdateBook(book) {
      this.$store.dispatch("books/updateBook", {
        ID: parseInt(this.book.ID),
        ...book,
      })
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.library__update-book {
  margin-top: 80px;
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