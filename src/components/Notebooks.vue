<template>
  <div class="page">
    <header @click="onCreate">
      <div>
        <svg>
          <use xlink:href="#icon-add"></use>
        </svg>
        <span>新建笔记本</span>
      </div>
    </header>
    <div class="xxx"></div>
    <main>
      <div class="layout">
        <h3>笔记本列表（{{ notebooks.length }}）</h3>
        <div class="list">
          <router-link :to="`/note?notebookId=${notebook.id}`" class="notebook" v-for="notebook in notebooks" :key="notebook.id">
            <div class="item">
              <div class="left">
                <svg>
                  <use xlink:href="#icon-notebook1"></use>
                </svg>
                <span class="name">{{ notebook.title }}</span>
                <span class="number">({{ notebook.noteCounts }})</span>
              </div>
              <div class="right">
                <span class="wrapper">{{ notebook.createdAtFriendly }}</span>
                <span class="wrapper" @click.stop.prevent="onEdit(notebook)">编辑</span>
                <span class="wrapper" @click.stop.prevent="onDelete(notebook)">删除</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "./SideBar"
import Auth from '@/apis/auth'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {SideBar},
  data() {
    return {}
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    this.getNotebooks()
  },
  computed: {
    ...mapGetters([
      'notebooks'
    ])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ]),
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符串'
      }).then(({value}) => {
        this.addNotebook({title: value})
      })
    },
    onEdit(notebook) {
      this.$prompt('请输入笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符串'
      }).then(({value}) => {
        this.updateNotebook({notebookId: notebook.id, title: value})
      })
    },
    onDelete(notebook) {
      this.$confirm('确定要删除该笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId: notebook.id})
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/Notebooks.less);
</style>
