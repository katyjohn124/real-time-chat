<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{ currentUser.username }}</strong>个人主页
            </h3>
        </header>
        <p v-if="currentUser && currentUser.accessToken">
            <strong>Token:</strong>
            {{ currentUser.accessToken.substring(0, 20) }} ...
            {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
        </p>

        <p>
            <strong>Id:</strong>
            {{ currentUser.id }}
        </p>
        <p>
            <strong>Email:</strong>
            {{ currentUser.email }}
        </p>
        <strong>Authentication:</strong>
        <ul>
            <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
        </ul>

    </div>
</template>

<script>
export default {
    name: 'ProfilePage',
    computed: {
        currentUser() {
            return this.$store.state.vali.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('./login');
        }
    }

};
</script>

