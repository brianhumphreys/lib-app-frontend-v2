<script setup>
import UpdateBook from "./UpdateBook.vue";
</script>

<template>
    <div class="container">
        <header class="library__profiles__top">
            <div class="header">
                <img v-bind:src="'https://randomuser.me/api/portraits/men/' + (authorID(book.author)) + '.jpg'"
                    alt="Author Image" class="library__picture">
                <h2>Book Details</h2>
            </div>
        </header>
        <main class="library__profiles">
            <div class="library__info-group">
                <p id="test-title" class="description-item"><strong>Title: </strong>{{ currentBook.title }}</p>
                <p id="test-author" class="description-item"><strong>Author: </strong>{{ currentBook.author }}</p>
                <p id="test-isbn" class="description-item"><strong>ISBN: </strong>{{ currentBook.isbn }}</p>
                <p id="test-description" class="description-item"><strong>Description: </strong>{{
                        currentBook.description
                }}</p>
                <UpdateBook :book="book" />
            </div>
        </main>

        <div class="library__profiles__table">
            <div class="history-table">
                <br />
                <h4>Book Checkout History</h4>
                <br />
                <table>
                    <tr>
                        <th>User's Email</th>
                        <th>Checked Out</th>
                        <th>Checked In</th>
                    </tr>
                    <tr v-for="user in userHistory">
                        <td>{{ user.email }}</td>
                        <td>{{ new Date(user.checked_out).toLocaleString() }}</td>
                        <td>{{ user.checked_in == "" ? "Currently checkout" : new
                                Date(user.checked_in.split('.')[0]).toLocaleString()
                        }}
                        </td>
                    </tr>
                </table>
            </div>
            <button id="delete-button" v-on:click="() => handleDelete(book)"
                class="btn btn-primary btn-block last-button">
                <span id="test-delete-button">Remove Book from Library</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminBookPage",
    computed: {
        isAdmin() {
            return this.$store.state.auth.user.role == 'admin';
        },
        currentBook() {
            const id = this.$route.params.id;
            return this.$store.state.books.books.reduce((accum, aBook) => aBook.ID == id ? aBook : accum, {});
        },
        userHistory() {
            // console.log(this.$store.state.books.userHistory);
            // this.$store.state.books.userHistory.forEach((user) => {
            //     console.log("user")
            //     console.log(user)
            //     console.log(user.checked_in.split('.')[0])
            //     console.log(user.checked_out.split('.')[0])
            // })
            return this.$store.state.books.userHistory;
        },
        currentUser() {
            if (this.$store.state.auth.user.id) {
                return this.$store.state.auth.user;
            }
            return {
                id: null,
                email: null,
                password: null,
                role: null,
                token: "000000000000000000000000",
            };
        },
    },
    methods: {
        handleDelete(book) {
            this.$router.push('/admin');
            this.$store.dispatch("books/deleteBook", book);
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
    mounted() {
        if (!this.currentUser.id) {
            this.$router.push('/login');
        }
        this.$store.dispatch("books/getUserHistory", this.currentBook);
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
    margin-bottom: 20px;
    margin-top: 50px;
    background-color: red;
    border-color: red;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 30px;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

.history-table {
    margin-bottom: 5-px
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
    margin-bottom: 50px;
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
.library__profiles__table {
    background-color: #eeeeee;
    border-radius: 12px 12px 12px 12px;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
    margin-top: 50px;
    margin-bottom: 150px;
}

</style>