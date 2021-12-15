<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" placement="bottom" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <div class="notes">
      <div v-for="note in notes" :key="note.noteId">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span>{{ note.updatedAtFriendly }}</span>
          <span>{{ note.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.getNotebooks().then(() => {
      this.setCurBook({curBookId: parseInt(this.$route.query.notebookId)})
      if (this.curBook.id) {
        return this.getNotes({notebookId: this.curBook.id})
      }
    }).then(() => {
      this.setCurNote({curNoteId: this.$route.query.noteId})
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.curNote.id,
          notebookId: this.curBook.id
        }
      })
    })
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),
    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.setCurBook({curBookId: parseInt(notebookId)})
      this.getNotes({notebookId}).then(() => {
        this.setCurNote()
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        })
      })
    },
    onAddNote() {
      this.addNote({notebookId: this.curBook.id})
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteSidebar.less);
</style>
