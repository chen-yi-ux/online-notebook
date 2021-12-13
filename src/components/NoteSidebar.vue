<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title" placement="bottom">
      <span class="el-dropdown-link">
        sdwewe
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          dsad
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <div class="notes">
      <div>
        <router-link to="/note/1">
          <span>11</span>
          <span>22</span>
        </router-link>
      </div>
      <div>
        <router-link to="/note/1">
          <span>11</span>
          <span>22</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import url(../assets/css/NoteSidebar.less);
</style>
