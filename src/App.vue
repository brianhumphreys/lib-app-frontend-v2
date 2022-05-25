<template>
  <div id="app">
    <NavagationBar />
    <div class="container">
      <router-view />
    </div><!--  -->
  </div>
</template>

<script>
import NavagationBar from './components/NavagationBar.vue'
export default {
  name: "App",
  components: {
    NavagationBar
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>