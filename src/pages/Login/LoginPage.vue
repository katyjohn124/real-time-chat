<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <!-- 动态绑定了输入表单验证的模式 -->
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <Field name="username" type="text" class="form-control" />
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <Field name="password" type="password" class="form-control" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group">
                    <!-- loading为true时，spinner图标旋转加载 -->
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm">

                        </span>
                        <span>登录</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: 'LoginPage',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        //用yup进行表单验证
        const schema = yup.object().shape({
            username: yup.string().required("用户名不能为空!"),
            password: yup.string().required("密码不能为空!")
        })
        //初始化数据
        return {
            loading: false,
            message: '',
            schema,
        };
    },
    computed: {
        //检查用户身份状态
        loggedIn() {
            return this.$store.state.vali.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/profile')
        }
    },
    methods: {
        handleLogin(user) {
            //带着数据点击登录后显示加载
            this.loading = true;

            this.$store.dispatch("vali/login", user)
                .then(() => {
                    this.$router.push('/profile')
                },
                    //这个错误处理有三种，首先是找服务器错误消息，二是一般消息，三是把错误消息转成字符串
                    (error) => {
                        this.loading = false;
                        this.message = (error.response && error.response.data && error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }

                )
        }
    },

};
</script>

<style lang="scss" scoped>
label {
    display: block;
    margin-top: 10px;
    text-align: left;
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