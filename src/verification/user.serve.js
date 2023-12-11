import axios from 'axios';
import valiHeader from './vali-header';

const API_URL = 'http://localhost:8080/api/test';

class UserService {
    //访问数据：公共内容、用户区、管理员区
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: valiHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: valiHeader() });
    }
}

export default new UserService();

