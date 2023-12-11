import { createStore } from "vuex";
import { vali } from './vali.module';

const store = createStore({
    modules: {
        vali
    },
});

export default store;