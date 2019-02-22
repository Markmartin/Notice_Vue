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
        userInfo: {
            account: "944565923@qq.com",
            pwd: "b8d023ff689a742827b7678afd0779e7",
            userId: 3
        },
        noticeList: [
            {
                content_cn: "<h3>ITC Progress Update 10/11/2018¨C16/11/2018</h3><ol><li>Add EVM benchmark<br></li><li>Add newops in eip<br></li></ol>",
                content_en: "<blockquote>[Done] Random-data-generator</blockquote><ul><li>Instances of most data type<br></li><li>Replace the majority of fixtures with property-based testing<br></li></ul>",
                content_kn: "",
                noticeId: 12,
                status: 0,
                title_cn: "ITC Progress Update 10/11/2018¨C16/11/2018",
                title_en: "英文周报",
                title_kn: ""
            }
        ],
        noticeInfo: {
            content_cn:"",
            
        },
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
            Object.keys(updateInfo).forEach(function (key) {
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
    var baseUrl = "http://47.75.16.97:5000";
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