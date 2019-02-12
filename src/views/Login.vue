<template>
    <div class="login">
        <label class="page_title">This is Login Page</label>
        <div class="input_area">
            <el-input placeholder="请输入账户" clearable ref="account" label="用户框" value="944565923@qq.com"></el-input>
            <el-input placeholder="请输入密码" clearable ref="pwd" type="password" class="input_vartical_distance" value="123456"></el-input>
            <el-button type="primary" class="login_btn" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    login() {
      if (this.$refs.account.currentValue.length == 0) {
        this.$message({
          showClose: true,
          message: "账户不能为空",
          type: "error"
        });
        return;
      }
      if (this.validationMail(this.$refs.account.currentValue) == false) {
        this.$message({
          showClose: true,
          message: "账户格式不正确",
          type: "error"
        });
        return;
      }
      if (this.$refs.pwd.currentValue.length < 6) {
        this.$message({
          showClose: true,
          message: "密码长度不正确",
          type: "error"
        });
        return;
      }
      this.loginRequest(
        this.$refs.account.currentValue,
        this.$refs.pwd.currentValue
      );

      //   this.$store.dispatch("login", {
      //     account: this.$refs.account.currentValue,
      //     pwd: this.$refs.pwd.currentValue
      //   });
    },
    validationMail(mailAddr) {
      var mailRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (mailRegex.test(mailAddr)) {
        return true;
      } else {
        return false;
      }
    },
    loginRequest(account, pwd) {
      var baseUrl =
        process.env.NODE_ENV === "development"
          ? "/api"
          : "http://127.0.0.1:3000";
      var resUrl = baseUrl + "/noticeManager/login";
      axios({
        method: "post",
        url: resUrl,
        data: {
          account: account,
          pwd: pwd
        }
      })
        .then(response => {
          var respObject = response.data;
          if (respObject.code == 200) {
            this.$store.commit("set_current_user", respObject.data);
            this.$router.push({ name: "Notice" });
          } else {
            this.$message({
              showClose: true,
              message: respObject.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error.message,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="less">
.page_title {
  display: block;
  width: 100%;
  height: 40px;
  font-size: 30px;
  color: black;
  margin-top: 200px;
}
.input_area {
  display: block;
  width: 300px;
  height: 200px;
  margin: 20px auto 0;
}

.input_vartical_distance {
  margin-top: 20px;
  margin-bottom: 20px;
}

.login_btn {
  padding-top: 20px;
  width: 100%;
}

.pagination {
  margin-top: 30px;
  .currentPage {
    padding: 0 20px 0 20px;
  }
}
</style>


