<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleSignup" :validation-schema="schema">
        <div v-if="!successful">
          <div id="email-field" class="form-group">
            <label for="email">Email</label>
            <Field id="email-input-field" name="email" type="email" class="form-control" />
            <ErrorMessage id="email-error-message" name="email" class="error-feedback" />
          </div>
          <div id="password-field" class="form-group">
            <label for="password">Password</label>
            <Field id="password-input-field" name="password" type="password" class="form-control" />
            <ErrorMessage id="password-error-message" name="password" class="error-feedback" />
          </div>
          <div id="role-selector" class="form-group">
            <label for="role">Role</label>
            <Field id="role-input-field" name="role" as="select" type="role" class="form-control" >
              <option value="">Select value</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Field>
            <ErrorMessage id="role-error-message" name="role" class="error-feedback" />
          </div>
          <div class="form-group">
            <button id="test-signup-button" class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Signup",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email required")
        .email("Email invalid")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password required")
        .min(6, "Must be longer than 6 characters")
        .max(40, "Cannot exceed 30 characters"),
      role: yup
        .string()
        .required("Must select one"),
    });
    const roles = [
      {
        text: "Select One",
        value: null,
      },
      "admin",
      "user",
    ]
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      roles,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleSignup(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/signup", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
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
.error-feedback {
  color: red;
}
</style>