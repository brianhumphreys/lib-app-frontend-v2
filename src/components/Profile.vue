<template>
    <div class="container">
        <header class="library__profiles__top">
            <div class="profile-header-image">
                <img id="profile-img" v-bind:src="'https://randomuser.me/api/portraits/men/' + (authorID(currentUser.email)) + '.jpg'" class="profile-img-card" />
                <h3 id="profile-header" class="profile-header profile-name">
                    <strong>{{ currentUser.email ? capitalizeFirstLetter(currentUser.email.split("@")[0]) : null
                    }}</strong>
                    Profile
                </h3>
            </div>

            <div class="profile-info-group">
                <div class="profile-info" id="profile-token">
                    <strong>Token:</strong>
                    {{" "}}
                    {{ currentUser.token.substring(0, 8) }} ...
                    {{ currentUser.token.substr(currentUser.token.length - 8) }}
                </div>
                <div class="profile-info" id="profile-id">
                    <strong>Id:</strong>
                    {{ currentUser.id }}
                </div>
                <div class="profile-info" id="profile-email">
                    <strong>Email:</strong>
                    {{ currentUser.email }}
                </div>
                <div class="profile-info" id="profile-role">
                    <strong>Role:</strong>
                    {{ currentUser.role }}
                </div>
            </div>
        </header>


        <main class="library__profiles">
            <h3 id="profile-header" class="profile-header">
                My Books
            </h3>
            <article id="test-my-book" v-for="book in myBooks" class="library__profile">
                <img v-bind:src="'https://randomuser.me/api/portraits/men/' + (authorID(book.author)) + '.jpg'"
                    alt="Author Image" class="library__picture">
                <div class="library__info-group">
                    <span id="test-my-book-title" class="library__book-title">{{ book.title }}</span>
                    <span class="library__author">{{ book.author }}</span>
                </div>

                <span class="library__value">{{ authorRating() }}<span>stars</span></span>
                <div></div>
                <div></div>
                <button id="return-button" class="btn btn-primary btn-block" v-on:click="() => handleCheckin(book.ID)">
                    <span id="test-return-button">Return Book</span>
                </button>
            </article>
        </main>
        <div class="library__profiles__table">
            <br />
            <h3 id="profile-header" class="profile-header">
                My Checkout History
            </h3>
            <br />
            <table>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Checked Out</th>
                    <th>Checked In</th>
                </tr>
                <tr v-for="book in bookHistory">
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ new Date(book.checked_out).toLocaleString() }}</td>
                    <td>{{ book.checked_in == "" ? "Currently checkout" : new Date(book.checked_in.split('.')[0]).toLocaleString() }}</td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Profile',
    computed: {
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
        myBooks() {
            return this.$store.state.books.myBooks;
        },
        bookHistory() {
            return this.$store.state.books.bookHistory;
        }
    },
    methods: {
        handleCheckin(bookId) {
            this.$store.dispatch("books/checkinBook", {
                bookId: bookId,
                userId: this.currentUser.id,
            });
            setTimeout(() => {
                this.$store.dispatch("books/getBookHistory", this.currentUser)
            }, 550);
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        authorID(string) {
            var hash = 0, i, chr;
            if (string.length === 0) return hash;
            for (i = 0; i < string.length; i++) {
                chr = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            if (hash < 0) {
                return (-1 * hash) % 100;
            }
            if (hash == 0) {
                return 1;
            }
            return hash % 100;
        },
        authorRating() {
            return Math.floor(Math.random() * 5) + 1;
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
        this.$store.dispatch("books/getBookHistory", this.currentUser)
        this.$store.dispatch("books/getMyBooks", this.currentUser)
    }
}
</script>

<style scoped>
.profile-img-card {
    width: 96px;
    height: 96px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.error-feedback {
    color: red;
}

.library {
    max-width: 490px;
    width: 100%;
    border-radius: 12px;
}

.library header {
    --start: 15%;
    height: 130px;
    background-image: repeating-radial-gradient(circle at var(--start), transparent 0%, transparent 10%, rgba(54, 89, 219, 0.33) 10%, rgba(54, 89, 219, 0.33) 17%), linear-gradient(to right, #5b7cfa, #3659db);
    color: #fff;
    position: relative;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
}

.library header .library__title {
    position: absolute;
    z-index: 2;
    top: 50%;
    right: calc(var(--start) * .75);
    transform: translateY(-50%);
    text-transform: uppercase;
    margin: 0;
}

.library header .library__title span {
    display: block;
}

.library header .library__title--top {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 6.5px;
}

.library header .library__title--bottom {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 3.55px;
    opacity: 0.65;
    transform: translateY(-2px);
}

.library header .library__icon {
    fill: #fff;
    opacity: 0.35;
    width: 50px;
    position: absolute;
    top: 50%;
    left: var(--start);
    transform: translate(-50%, -50%);
}

/* .library__profiles {
    background-color: #fff;
    border-radius: 0 0 12px 12px;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
} */


.library__profiles {
    background-color: #eeeeee;
    border-radius: 0 0 12px 12px;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
    margin-bottom: 50px;
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

.profile-header {
    color: #565656;
}


.library__info-group {
    display: flex;
    flex-direction: column;
    ;
}

.library__profile {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    padding: 10px 30px 10px 10px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98), box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
    background-color: #fff;
}

.library__profile:hover {
    transform: scale(1.03);
    box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
}

.library__picture {
    max-width: 100%;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
}

.library__author {
    color: #979cb0;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.64px;
    margin-left: 12px;
}

.library__book-title {
    color: #979cb0;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.64px;
    margin-left: 12px;
}

.library__value {
    color: #35d8ac;
    font-weight: 700;
    font-size: 34px;
    text-align: right;
}

.library__value>span {
    opacity: 0.8;
    font-weight: 600;
    font-size: 13px;
    margin-left: 3px;
}

body {
    margin: 0;
    background-color: #eaeaea;
    display: grid;
    height: 100vh;
    place-items: center;
    font-family: 'Source Sans Pro', sans-serif;
}

.library {
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
}

.available {
    color: green;
}

.not-available {
    color: red;
}

.profile-info {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    color: #565656;
}

.profile-info-group {
    display: flex;
    flex-direction: column;
}

.header-info {

    justify-content: flex-start;
    /* flex-wrap: var(--start); */
    width: 25vw;
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
    margin-bottom: 100px
}

.profile-header-image {
    display:flex;
    flex-direction: row;
    align-items: center;
}

.profile-name {
    margin-left: 20px;
}
</style>