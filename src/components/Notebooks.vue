<template>
  <div class="page">
    <SideBar/>
    <div class="content">
      <header @click="onCreate">
        <svg>
          <use xlink:href="#icon-add"></use>
        </svg>
        <span>新建笔记本</span>
      </header>
      <div class="xxx"></div>
      <main>
        <div class="layout">
          <h3>笔记本列表（{{ notebooks.length }}）</h3>
          <div class="list">
            <router-link to="/note/1" class="notebook" v-for="notebook in notebooks" :key="notebook.id">
              <div class="item">
                <div class="left">
                  <svg>
                    <use xlink:href="#icon-notebook1"></use>
                  </svg>
                  <span class="name">{{ notebook.title }}</span>
                  <span class="number">({{ notebook.noteCounts }})</span>
                </div>
                <div class="right">
                  <span class="wrapper">{{notebook.createdAtFriendly}}</span>
                  <span class="wrapper" @click.stop.prevent="onEdit(notebook)">编辑</span>
                  <span class="wrapper" @click.stop.prevent="onDelete(notebook)">删除</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar"
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import {friendlyDate} from "@/helpers/util"

export default {
  components: {SideBar},
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })

    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符串'
      }).then(({value}) => {
        Notebooks.addNotebook({title: value})
        .then(res => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
          res.data.noteCounts = 0
          this.notebooks.unshift(res.data)
        })
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
        Notebooks.updateNotebook(notebook.id, {title: value})
        notebook.title = value
      })
    },
    onDelete(notebook) {
      this.$confirm('确定要删除该笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Notebooks.deleteNotebook(notebook.id)
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/Notebooks.less);
</style>
