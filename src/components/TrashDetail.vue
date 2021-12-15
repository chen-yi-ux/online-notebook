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
            <span>{{ note.createdAtFriendly }}</span>
            <span>{{ note.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{ curTrashNote.createdAtFriendly }}</span>
        <span>更新日期：{{ curTrashNote.updatedAtFriendly }}</span>
        <span>所属笔记本：{{ belongTo }}</span>
        <span class="action" @click="onDelete">彻底删除</span>
        <span class="action" @click="onRevert">恢复</span>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="note-content">
        <div class="preview markdown-body" v-html="compileMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import {mapGetters, mapMutations, mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  data() {
    return {}
  },
  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
    this.getTrashNotes().then(() => {
      this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId})
      this.$router.replace({
        path: '/trash',
        query: {noteId: this.curTrashNote.id}
      })
    })
  },
  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compileMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getNotebooks'
    ]),
    onDelete() {
      this.$confirm('删除后将无法恢复', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.deleteTrashNote({noteId: this.curTrashNote.id})
      }).then(() => {
        this.setCurTrashNote()
        this.$router.replace({
          path: '/trash',
          query: {noteId: this.curTrashNote.id}
        })
      })
    },
    onRevert() {
      this.revertTrashNote({noteId: this.curTrashNote.id})
        .then(() => {
          this.setCurTrashNote()
          this.$router.replace({
            path: '/trash',
            query: {noteId: this.curTrashNote.id}
          })
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({curTrashNoteId: parseInt(to.query.noteId)})
    next()
  }
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
