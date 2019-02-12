<template>
    <div class="notieList">
      <h1>通知列表</h1>
      <el-button type="success" @click="handCreate">新建通知</el-button>
      <el-table :data="realdata" style="width: 100%">
          <el-table-column label="公告ID" prop="noticeId"></el-table-column>
          <el-table-column label="公告标题" prop="title_cn"></el-table-column>
          <el-table-column label="公告状态" prop="status" :formatter="statusFormatter"></el-table-column>
          <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
        <el-button type="primary" icon="el-icon-arrow-left" id="last" @click="lastPage" :disabled="current_page==1?true:false">上一页</el-button>
        <span class="currentPage">{{current_page}}</span>
        <el-button type="primary" id="next" @click="nextPage" :disabled="this.$store.state.noticeList.length<10?true:false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div>
      
      <el-dialog title="秘钥" :visible.sync="dialogVisible">
        <el-input placeholder="请输入secretKey" clearable ref="secretKey" v-model="secretKey"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      secretKey: "",
      dialogVisible: false,
      current_page: 1
    };
  },
  computed: {
    realdata() {
      return this.$store.state.noticeList;
    }
  },
  methods: {
    handCreate() {
      this.$router.push({ name: "NoticeEdit", params: { index: -1 } });
    },
    handleEdit(index) {
      this.$router.push({ name: "NoticeEdit", params: { index: index } });
    },
    handleDelete(index, row) {
      if (this.secretKey == "" || this.secretKey.length <= 32) {
        this.dialogVisible = true;
        return;
      }
      var baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:3000"
          : "https://wallet.iotchain.io";
      var resUrl = baseUrl + "/notice/delete";
      axios({
        method: "post",
        url: resUrl,
        data: {
          secretKey: this.secretKey,
          account: this.$store.state.userInfo.account,
          noticeId: row.noticeId
        }
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "success"
            });
            this.updateNoticeList();
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
    },
    lastPage() {
      this.current_page--;
      this.updateNoticeList();
    },
    nextPage() {
      this.current_page++;
      this.updateNoticeList();
    },
    updateNoticeList() {
      this.$store.dispatch("request_notice_list", this.current_page);
    },
    statusFormatter(row) {
      return row.status == 0 ? "未完成" : "可发布";
    }
  },
  mounted: function() {
    if (Object.keys(this.$store.state.userInfo) == 0) {
      this.$router.push({ name: "Login" });
    } else {
      this.updateNoticeList();
    }
  }
};
</script>

<style lang="less" scoped>
.notieList {
  max-width: 1200px;
  margin: 0 auto 0;
}
</style>


  