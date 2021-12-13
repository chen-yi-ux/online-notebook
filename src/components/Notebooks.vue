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
import Notebooks from '@/apis/notebooks'
import {friendlyDate} from "@/helpers/util"
import {Message} from 'element-ui'

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
        return Notebooks.addNotebook({title: value})
      }).then(res => {
        res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
        res.data.noteCounts = 0
        this.notebooks.unshift(res.data)
        Message.success(res.msg)
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符串'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, {title: value})
      }).then(res => {
        notebook.title = title
        Message.success(res.msg)
      })
    },
    onDelete(notebook) {
      this.$confirm('确定要删除该笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id)
      }).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        Message.success(res.msg)
      }).catch(() => {
        Message.info('取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/Notebooks.less);
</style>
