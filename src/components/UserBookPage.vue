<template>
    <div class="container">
        <!-- <div class="col-xs-12 col-md-10 offset-md-1"> -->
        <header class="library__profiles__top">
            <div class="header">
                <img v-bind:src="'https://randomuser.me/api/portraits/men/' + (authorID(book.author)) + '.jpg'"
                    alt="Author Image" class="library__picture">
                <h2>Book Details</h2>
            </div>
        </header>
        <main class="library__profiles">
            <div class="library__info-group">
                <p id="test-browse-title" class="description-item"><strong>Title: </strong>{{ currentBook.title
                }}</p>
                <p id="test-browse-author" class="description-item"><strong>Author: </strong>{{
                        currentBook.author
                }}</p>
                <p id="test-browse-isbn" class="description-item"><strong>ISBN: </strong>{{ currentBook.isbn }}
                </p>
                <p id="test-browse-description" class="description-item"><strong>Description: </strong>{{
                        currentBook.description
                }}</p>
                <div id="is-available">
                    <span id="book-is-available" class="available" v-if="book.available">available</span>
                    <span id="book-not-available" class="not-available" v-else>not available</span>
                </div>
                <button id="checkout-button" v-on:click="handleCheckout" class="btn btn-primary btn-block last-button"
                    :disabled="!currentBook.available">
                    <span id="test-checkout-button">Checkout</span>
                </button>
            </div>
        </main>
    </div>
    <!-- </div> -->
    <!-- </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: "UserBookPage",
    computed: {
        isAdmin() {
            return this.$store.state.auth.user.role == 'admin';
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
        currentBook() {
            const id = this.$route.params.id;
            return this.$store.state.books.books.reduce((accum, aBook) => aBook.ID == id ? aBook : accum, {});
        },
    },
    methods: {
        handleCheckout() {
            this.$router.push('/library');
            this.$store.dispatch("books/checkoutBook", {
                bookId: this.currentBook.ID,
                userId: this.currentUser.id,
            });
        },
        authorID(string) {
            var hash = 0, i, chr;
            if (string.length === 0) return hash;
            for (i = 0; i < string.length; i++) {
                chr = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            if (hash < 0) {
                return (-1 * hash) % 100;
            }
            if (hash == 0) {
                return 1;
            }
            return hash % 100;
        },
    },
    data() {
        const id = this.$route.params.id;
        const book = this.$store.state.books.books.reduce((accum, aBook) => aBook.ID == id ? aBook : accum, {});
        return {
            book: {
                ...book,
                ID: parseInt(id),
            }
        }
    }
};
</script>

<style scoped>
.last-button {
    margin-bottom: 100px;
    margin-top: 50px;
    background-color: green;
    border-color: green;
}

.last-button:disabled {
    background-color: grey;
    border-color: grey;
}

.library__picture {
    margin-right: 50px;
    margin-bottom: 50px;
    margin-top: 50px;
    max-width: 100%;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
}

.header {
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.available {
    color: green;
    font-size: 20px;
}

.not-available {
    color: red;
    font-size: 20px;
}

.description-item {
    font-size: 20px;
}

.library__profiles {
    background-color: #eeeeee;
    border-radius: 0 0 12px 12px;
    /* padding: 15px 15px 20px; */
    display: grid;
    row-gap: 8px;
    margin-bottom: 150px;
    padding: 15px 15px 20px;
}

.library__profiles__top {
    background-color: #eeeeee;
    border-radius: 12px 12px 0 0;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
    margin-top: 50px
}
</style>