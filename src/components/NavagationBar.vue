<template>
    <nav id="logged-out-nav" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="nav-logo">
            <!-- <img src="@/assets/psychlogo.jpeg" width="30px" height="30px"/>
            w0oooo -->
        </div>
        <div v-if="currentUser.id == null" class="navbar-nav ml-auto">
            <li class="nav-item">
                <router-link id="signup-link" to="/signup" class="nav-link">
                    <font-awesome-icon icon="user-plus" /> Sign Up
                </router-link>
            </li>
            <li class="nav-item">
                <router-link id="login-link" to="/login" class="nav-link">
                    <font-awesome-icon icon="sign-in-alt" /> Login
                </router-link>
            </li>
        </div>
        <div v-if="currentUser.id != null" class="navbar-nav ml-auto">
            <li v-if="currentUser.role == `admin`" class="nav-item">
                <router-link id="admin-link" to="/admin" class="nav-link">
                    <font-awesome-icon icon="fa-solid fa-lock-open" />
                    Admin
                </router-link>
            </li>
            <li class="nav-item">
                <router-link id="browse-library-link" to="/library" class="nav-link">
                    <font-awesome-icon icon="home" />
                    Browse
                </router-link>
            </li>
            <li class="nav-item">
                <router-link id="profile-link" to="/profile" class="nav-link">
                    <font-awesome-icon icon="user" />
                    {{ capitalizeFirstLetter(currentUser.email.split("@")[0]) }}
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click.prevent="logOut">
                    <font-awesome-icon icon="sign-out-alt" /> LogOut
                </a>
            </li>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavagationBar',
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
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
};
</script>

<style scoped>
.nav-logo {
    float: left;
}
</style>