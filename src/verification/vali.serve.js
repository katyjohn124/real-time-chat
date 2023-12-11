import axios from 'axios';
// import { response } from 'express';
//设置身份验证
const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    //登录
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    //存储token可以维护用户在web程序中的身份验证状态
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    //注销
    logout() {
        localStorage.removeItem('user');
    }

    //注册
    register(user) {
        return axios
            .post(API_URL + 'signup', {
                username: user.username,
                email: user.email,
                password: user.password
            });
    }
}

export default new AuthService();


