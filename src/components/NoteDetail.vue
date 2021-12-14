<template>
  <div class="page">
    <NoteSidebar :curNote="curNote" @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{statusText }}</span>
          <span class="action">删除</span>
          <span class="action">预览</span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="笔记本标题" @input="updateNote" v-model:value="curNote.title" @keydown="statusText='正在输入...'">
        </div>
        <div class="note-content">
          <textarea v-show="true" v-model:value="curNote.content" placeholder="输入内容，支持 markdown 语法" @input="updateNote" @keydown="statusText='正在输入...'"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "./NoteSidebar"
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'
import _ from 'loadsh'
import Notes from '@/apis/notes'

export default {
  components: {NoteSidebar},
  data() {
    return {
      curNote: {},
      notes: [],
      statusText: '笔记未改动'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Bus.$once('update:notes', val => {
      this.curNote = val.find(note => note.id === parseInt(this.$route.query.noteId)) || {}
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id === parseInt(to.query.noteId))
    next()
  },
  methods:{
    updateNote: _.debounce(function() {
      Notes.updateNote({noteId: this.curNote.id}, {title: this.curNote.title, content: this.curNote.content})
      .then(data => {
        this.statusText = '已保存'
      }).catch(data => {
        this.statusText = '保存出错'
      })
    }, 300)
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteDetail.less);
</style>
