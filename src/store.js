import Vue from 'vue'
import Vuex from 'vuex'

// //moment
// import moment from 'moment'

// //nodejs-crypto
// import crypto from 'crypto'

//vue-http request
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        noticeList: [],
        noticeInfo: {},
    },
    mutations: {
        set_current_user(state, userInfo) {
            state.userInfo = userInfo;
        },
        update_note_list(state, newList) {
            //翻页
            state.noticeList = newList;
        },
        set_current_notice(state, index) {
            if (index == -1) {
                state.noticeInfo = {
                    title_cn: '',
                    content_cn: '',
                    title_en: '',
                    content_en: '',
                    title_kn: '',
                    content_kn: ''
                }
            } else {
                state.noticeInfo = state.noticeList[index]
            }
        },
        update_current_edit_notice(state, updateInfo) {
            Object.keys(updateInfo).forEach(function(key) {
                state.noticeInfo[key] = updateInfo[key]
            });
        }
    },
    actions: {
        async request_notice_list(context, page) {
            //请求分页notice
            let resObject = await updateList(page);
            if (resObject.code == 200) {
                context.commit('update_note_list', resObject.data)
            }
        }
    }
})


async function updateList(page) {
    var baseUrl = "http://127.0.0.1:3000";
    var resUrl = baseUrl + '/notice/list';
    return axios({
        method: 'post',
        url: resUrl,
        data: {
            page: page
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return { code: 600, data: error, msg: error.message }
    })
}