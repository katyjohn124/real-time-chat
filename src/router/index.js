import { createWebHistory, createRouter } from "vue-router";

import PublicPage from '../components/PublicPage.vue'
import LoginPage from '../pages/Login/LoginPage.vue'
import RegisterPage from '../pages/Login/RegisterPage.vue'
import HomePage from '../pages/Home/HomePage.vue'

//懒加载
const ProfilePage = () => import("../pages/Login/ProfilePage.vue")
const BoardAdmin = () => import("../pages/BoardPage/BoardAdmin.vue")
const BoardUser = () => import("../pages/BoardPage/BoardUser.vue")


const routes = [
    {
        path: '/',
        redirect: '/register'
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/public',
        name: 'public',
        component: PublicPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    //以下是懒加载的路由部分
    {
        path: '/admin',
        name: 'boardadmin',
        component: BoardAdmin
    },
    {
        path: '/user',
        name: 'boarduser',
        component: BoardUser
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;