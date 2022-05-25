<template>
    <div class="container">
        <header class="library__profiles__top">
            <div class="library__title__header">
                <h1 class="library__title"><span class="library__title--top">Psychology Today Library</span> </h1>
            </div>
        </header>
        <main class="library__profiles">
            <article id="user-book-row" v-for="book in books" class="library__profile" v-on:click="() => routeToBook(book.ID)">
                <img v-bind:src="'https://randomuser.me/api/portraits/men/' + (authorID(book.author)) + '.jpg'"
                    alt="Author Image" class="library__picture">
                <div class="library__info-group">
                    <span id="test-library-book-title" class="library__book-title">{{ book.title }}</span>
                    <span class="library__author">{{ book.author }}</span>
                </div>

                <span class="library__value">{{ authorRating() }}<span>stars</span></span>
                <div></div>
                <div id="is-available">
                    <span id="book-is-available" class="available" v-if="book.available">available</span>
                    <span id="book-not-available" class="not-available" v-else>not available</span>
                </div>
            </article>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Library',
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
        books() {
            return this.$store.state.books.books;
        }
    },
    methods: {
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
        routeToBook(id) {
            this.$router.push("/book/" + id);
        }
    },
    mounted() {
        if (!this.currentUser.id) {
            this.$router.push('/login');
        } else {
            this.$store.dispatch("books/getBooks");
        }
    }
}
</script>

<style scoped>
.library {
    max-width: 490px;
    width: 100%;
    border-radius: 12px;
}

.library header {
    --start: 15%;
    height: 130px;
    background-image: repeating-radial-gradient(circle at var(--start), transparent 0%, transparent 10%, rgba(54, 89, 219, 0.33) 10%, rgba(54, 89, 219, 0.33) 17%), linear-gradient(to right, #5b7cfa, #3659db);
    color: #eeeeee;
    position: relative;
    /* border-radius: 12px 12px 0 0; */
    overflow: hidden;
}

.library header .library__title {
    margin-top: 20px;
    margin: 0;
}

.library h1 .library__title__header {
    margin-top: 20px;
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

.library__profiles {
    background-color: #eeeeee;
    border-radius: 0 0 12px 12px;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
    margin-bottom: 150px;
}

.library__profiles__top {
    background-color: #eeeeee;
    border-radius: 12px 12px 0 0 ;
    padding: 15px 15px 20px;
    display: grid;
    row-gap: 8px;
    margin-top: 50px
}

.library__title__header {
    margin-top: 20px;
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
</style>