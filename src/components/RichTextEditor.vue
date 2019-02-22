<template>
  <div>
    <el-input
      placeholder="请输入标题"
      clearable
      ref="title"
      class="title"
      @blur="end_edit_title"
      v-model="title"
    ></el-input>

    <div class="editor_area" ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  data: function() {
    return {
      editor: {}
    };
  },
  props: {
    lan: String
  },
  mounted() {
    var editor = new Editor(this.$refs.editor);
    // this.editor.customConfig.onchange = html => {
    //   this.editorContent = html;
    // };
    editor.customConfig.onblur = this.end_edit_content;
    editor.create();
    editor.txt.html(this.present);
    this.editor = editor;
    this.set_editor_Content();
  },
  methods: {
    set_editor_Content() {
      this.editor.txt.html(this.present);
    },
    end_edit_title(input) {
      if (input.target.value.length > 0) {
        var key = "title_" + this.lan;
        this.$store.commit("update_current_edit_notice", {
          [key]: input.target.value
        });
      }
    },
    end_edit_content(html) {
      var key = "content_" + this.lan;
      this.$store.commit("update_current_edit_notice", {
        [key]: html
      });
    }
  },
  computed: {
    title() {
      return this.$store.state.noticeInfo["title_" + this.lan] == undefined
        ? ""
        : this.$store.state.noticeInfo["title_" + this.lan];
    },
    present() {
      return this.$store.state.noticeInfo["content_" + this.lan] == undefined
        ? ""
        : this.$store.state.noticeInfo["content_" + this.lan];
    }
  },
  watch: {
    present: function() {
      this.set_editor_Content();
    }
  }
};
</script>

<style scoped>
.editor_area {
  margin-top: 20px !important;
}
</style>


