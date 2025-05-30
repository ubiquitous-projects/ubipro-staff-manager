import App from "./App";
import router from "./router";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App },
});
