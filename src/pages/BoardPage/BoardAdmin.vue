<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
        </header>
    </div>
</template>

<script>

import UserService from '../../verification/user.serve'
export default {
    name: 'BoardAdmin',
    data() {
        return {
            content: '',
        }
    },
    mounted() {
        UserService.getAdminBoard()
            .then((response) => {
                this.content = response.data
            },
                (error) => {
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }

            )
    }

};
</script>

