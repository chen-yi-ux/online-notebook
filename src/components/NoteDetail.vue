<template>
  <div class="page">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：1天前</span>
        <span>更新日期：刚刚</span>
        <span>未保存</span>
        <span class="action">删除</span>
        <span class="action">预览</span>
      </div>
      <div class="note-title">
        <input type="text" placeholder="笔记本标题">
      </div>
      <div class="note-content">
        <textarea placeholder="输入内容，支持 markdown 语法"></textarea>
        <!--        <div class="preview markdown-body" v-html="previewContent"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "./NoteSidebar"
import Auth from '@/apis/auth'

export default {
  components: {NoteSidebar},
  data() {
    return {
      msg: this.$route.params.noteId
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
  },
}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteDetail.less);
</style>
