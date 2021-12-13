<template>
  <div class="page">
    <SideBar/>
    <div class="content">
      <header>
        <svg>
          <use xlink:href="#icon-add"></use>
        </svg>
        <span>新建笔记本</span>
      </header>
      <div class="xxx"></div>
      <main>
        <div class="layout">
          <h3>笔记本列表（0）</h3>
          <div class="list">
            <router-link to="/note/1" class="notebook">
              <div class="item">
                <div class="left">
                  <svg>
                    <use xlink:href="#icon-notebook1"></use>
                  </svg>
                  <span class="name">第一个笔记本</span>
                  <span class="number">(1)</span>
                </div>
                <div class="right">
                  <span class="wrapper">1天前</span>
                  <span class="wrapper" @click.stop.prevent="onEdit">编辑</span>
                  <span class="wrapper" @click.stop.prevent="onDelete">删除</span>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <svg>
                    <use xlink:href="#icon-notebook1"></use>
                  </svg>
                  <span class="name">第一个笔记本</span>
                  <span class="number">(1)</span>
                </div>
                <div class="right">
                  <span class="wrapper">1天前</span>
                  <span class="wrapper" @click.stop.prevent="onEdit">编辑</span>
                  <span class="wrapper" @click.stop.prevent="onDelete">删除</span>
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
export default {
  components: {SideBar},
  data(){
    return {
    }
  },
  methods: {
    onEdit(){
      console.log('编辑')
    },
    onDelete(){
      console.log('删除')
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/Notebooks.less);
</style>
