//创建一个辅助函数检查本地存储的user是否使用JWT？返回http标头：返回空对象
export default function valiHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        //适用于nodejs express的后端服务器
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}