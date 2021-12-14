<template>
  <div class="trash">
    <div class="note-sidebar">
      <span class="notebook-title">
        回收站
      </span>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <div class="notes">
        <div>
          <router-link to="/trash/1">
            <span>11</span>
            <span>22</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：1天前</span>
        <span>更新日期：5分钟前</span>
        <span>所属笔记本：第一个</span>
        <span class="action">彻底删除</span>
        <span class="action">恢复</span>
      </div>
      <div class="note-title">
        <span>第一个笔记</span>
      </div>
      <div class="note-content">
        <div class="preview markdown-body" v-html="compileMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
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
@import url(../assets/css/NoteSidebar.less);
@import url(../assets/css/NoteDetail.less);

.trash {
  display: flex;
  align-items: stretch;
  flex: 1;
}
</style>
