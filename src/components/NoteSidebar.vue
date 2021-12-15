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
  props: ['curNote'],
  data() {
    return {}
  },
  created() {
    // Notebooks.getAll()
    //   .then(res => {
    //     this.notebooks = res.data
    //     this.curBook = this.notebooks.find(notebook => notebook.id === parseInt(this.$route.query.notebookId)) || this.notebooks[0] || {}
    //     return Notes.getAll({notebookId: this.curBook.id})
    //   }).then(res => {
    //   this.notes = res.data
    //   this.$emit('update:notes', this.notes)
    //   Bus.$emit('update:notes', this.notes)
    // })
    this.getNotebooks().then(() => {
      this.setCurBook({curBookId: parseInt(this.$route.query.notebookId)})
      if(this.curBook.id){ return this.getNotes({notebookId: this.curBook.id})}
    })
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurBook'
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
      this.getNotes({notebookId})
    },
    onAddNote(){
      this.addNote({notebookId: this.curBook.id})
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteSidebar.less);
</style>
