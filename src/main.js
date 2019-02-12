import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//elemeUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//moment
import moment from 'moment'

//nodejs-crypto
import crypto from 'crypto'

// //vue-http request
// import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$moment = moment
Vue.prototype.$crypto = crypto

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')