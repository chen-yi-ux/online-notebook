<template>
  <div class="page">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id" class="note-detail-ct">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="action" @click="onDeleteNote">删除</span>
          <span class="action" @click="isShowPreview = !isShowPreview">预览</span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="笔记本标题" @input="onUpdateNote" v-model:value="curNote.title"
                 @keydown="statusText='正在输入...'">
        </div>
        <div class="note-content">
          <textarea v-show="!isShowPreview" v-model:value="curNote.content" placeholder="输入内容，支持 markdown 语法"
                    @input="onUpdateNote" @keydown="statusText='正在输入...'"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "./NoteSidebar"
import Auth from '@/apis/auth'
import _ from 'loadsh'
import MarkdownIt from 'markdown-it'
import {mapGetters, mapMutations, mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar},
  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    this.setCurNote({curNoteId: parseInt(this.$route.query.noteId)})
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent() {
      return md.render(this.curNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote'
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(() => {
          this.statusText = '已保存'
        }).catch(() => {
        this.statusText = '保存出错'
      })
    }, 300),
    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(() => {
          this.$router.replace({path: '/note'})
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: parseInt(to.query.noteId)})
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteDetail.less);
</style>
