import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Notice from './views/Notice.vue'
import NoticeEdit from './views/NoticeEdit.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/notice_list',
        name: 'Notice',
        component: Notice
    },
    {
        path: '/notice_edit',
        name: 'NoticeEdit',
        component: NoticeEdit
    },
    ]
})