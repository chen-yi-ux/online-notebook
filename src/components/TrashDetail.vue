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
        <div v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span>{{note.createdAtFriendly}}</span>
            <span>{{note.title}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{curTrashNote.createdAtFriendly}}</span>
        <span>更新日期：{{curTrashNote.updatedAtFriendly}}</span>
        <span>所属笔记本：{{belongTo}}</span>
        <span class="action" @click="onDelete">彻底删除</span>
        <span class="action" @click="onRevert">恢复</span>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
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
      trashNotes: [],
      curTrashNote: {},
      belongTo: '第一个'
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
  computed: {
    compileMarkdown(){
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    onDelete(){
      console.log('彻底删除')
    },
    onRevert(){
      console.log('恢复')
    }
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
