import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { auth } from "./auth.module";
import { books } from "./books.module";


const store = createStore({
  modules: {
    auth,
    books,
  },
});

export default store;