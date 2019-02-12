<template>
    <div class="noticeEdit">
      <h1>This is Notice_Edit Page</h1>
      <div class="lan_type">
        <el-radio-group v-model="lan.lan">
          <el-radio-button :label="lan.cn"></el-radio-button>
          <el-radio-button :label="lan.en"></el-radio-button>
          <el-radio-button :label="lan.kn"></el-radio-button>
        </el-radio-group>
			</div>
      <div class="noticeEditArea">
        <rich-text-editor v-bind:lan="this.lantype"></rich-text-editor>
      </div>
      <el-input placeholder="请输入secretKey" clearable ref="secret_key" class="secret_key" v-model="secret_key"></el-input>
      <div class="bottom_btn">
        <el-button type="primary" @click="back_to_notice_list">返回</el-button>
        <el-button type="primary" @click="submit_notice">提交</el-button>
      </div>
    </div>
</template>


<script>
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor.vue";

export default {
  created: function() {
    if (this.$route.params.index == undefined) {
      //跳回login_page
      this.$router.push({ name: "Login" });
      return;
    }
    this.$store.commit("set_current_notice", this.$route.params.index);
    this.type = this.$route.params.index == -1 ? "add" : "update";
  },
  data: function() {
    return {
      secret_key: "",
      type: "",
      lan: {
        cn: "中文",
        en: "English",
        kn: "한국어",
        lan: "中文"
      }
    };
  },
  computed: {
    lantype() {
      if (this.lan.lan == this.lan.cn) {
        return "cn";
      } else if (this.lan.lan == this.lan.en) {
        return "en";
      } else {
        return "kn";
      }
    }
  },
  methods: {
    back_to_notice_list() {
      this.$router.push({ name: "Notice" });
    },
    submit_notice() {
      if (this.secret_key.length <= 32) {
        this.$message({
          showClose: true,
          message: "secretKey错误",
          type: "error"
        });
        return;
      }
      var baseUrl =
        process.env.NODE_ENV === "development"
          ? "/api"
          : "http://127.0.0.1:3000";
      var resUrl = baseUrl + "/notice/" + this.type;
      axios({
        method: "post",
        url: resUrl,
        data: {
          secretKey: this.secret_key,
          account: this.$store.state.userInfo.account,
          notice: this.$store.state.noticeInfo
        }
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          this.$message({
            showClose: true,
            message: error.message,
            type: "error"
          });
        });
    }
  },
  //子组件
  components: {
    RichTextEditor
  }
};
</script>

<style scoped>
.lan_type {
  margin: 10px auto 20px;
}
.noticeEditArea {
  position: relative;
  max-width: 750px;
  margin: 0 auto 0;
  /* height: 900px; */
}
.bottom_btn {
  margin: 20px auto 0;
}

.secret_key {
  max-width: 750px;
  margin: 10px auto 0;
}
</style>
