<template>
    <div class="container">
        <div class="col-lg-6 offset-lg-3">
            <div v-if="ready">
                <p v-for="(user, i) in info" :key="i">
                    {{ user.username }} {{ user.type }}
                </p>
            </div>

            <div v-if="!ready">
                <h4>输入您的名字</h4>
                <form @submit.prevent="addUser">
                    <div class="form-group row">
                        <input type="text" class="form-control col-9" v-model="username" placeholder="在此输入您的名字" />
                        <input type="submit" value="Join" class="btn btn-sm btn-info ml-1" />
                    </div>
                </form>
            </div>
            <h2 v-else>{{ username }}</h2>
            <div class="card bg-info" v-if="ready">
                <div class="card-header text-white">
                    <h4>
                        在线实时聊天程序
                        <span class="float-right">{{ connections }} connections</span>
                    </h4>
                </div>
                <ul class="list-group list-group-flush text-right">
                    <small v-if="typing" class="text-white">{{ typing }} 正在输入...</small>
                    <li class="list-group-item" v-for="(message, i) in messages" :key="i">
                        <!-- <span v-if="!message.isMine" class="float-left">
                            {{ message.user }}:{{ message.message }}
                        </span>
                        <span v-else class="float-right">
                            {{ message.message }}
                        </span> -->
                        <span :class="message.isMine ? 'float-right' : 'float-left'">
                            {{ message.user }}: {{ message.message }}
                        </span>
                    </li>
                </ul>

                <div class="card-body">
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="newMessage" placeholder="在此输入信息" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//引入socket.io
import { ref, watch, reactive } from 'vue';
import io from 'socket.io-client';
//引入服务器端口
const socket = io('http://localhost:3000');
export default {
    name: 'HomePage',

    setup() {
        //用vue3组合式api来初始化数据
        let newMessage = ref(null);
        let typing = ref(false);
        let ready = ref(false);
        let info = reactive([]);
        let connections = ref(0);
        const messages = reactive([]);
        const username = ref(null);


        //触发提醒
        window.onbeforeunload = () => {
            socket.emit("leave", username.value);
        };

        // socket.on("connect", () => {
        //     console.log("成功连接到服务器");
        // });

        socket.on("chat-message", (data) => {
            messages.push({
                message: data.message,
                user: data.user,
                //如果是发送者是当前页面用户，则为true，完善用户体验
                isMine: data.user === username.value,
            });
        });

        socket.on("typing", (data) => {
            typing.value = data;
        });

        socket.on("stopTyping", () => {
            typing.value = false;
        });

        socket.on("joined", (data) => {
            info.push({
                username: data.name,
                type: "joined",
            });
            //如果是数组再处理
            if (Array.isArray(data.messages)) {
                messages.push(...data.messages);
            }
            //延迟清除
            setTimeout(() => {
                info.length = 0;
            }, 5000);
        });

        socket.on("leave", (data) => {
            info.push({
                username: data,
                type: "left",
            });

            setTimeout(() => {
                info.length = 0;
            }, 5000);
        });
        //显示用户连接数
        socket.on("connections", (data) => {
            console.log("接收到连接数：", data);
            connections.value = data;
        });


        watch(newMessage, (newMessage) => {
            newMessage
                ? socket.emit("typing", username.value)
                : socket.emit("stopTyping");
        });

        function send() {
            messages.push({
                message: newMessage.value,
                type: 0,
                user: "Me",
            });

            socket.emit("chat-message", {
                message: newMessage.value,
                user: username.value,
            });
            newMessage.value = null;
        }

        function addUser() {
            ready.value = true;
            socket.emit("joined", username.value);
        }

        return {
            addUser,
            send,
            newMessage,
            messages,
            typing,
            username,
            ready,
            info,
            connections,
        };
    },
};


</script>

<style lang="scss" scoped>
.float-left {
    float: left;
    clear: both;
    /* 避免浮动元素相互覆盖 */
}

.float-right {
    float: right;
    clear: both;
    /* 避免浮动元素相互覆盖 */
}
</style>