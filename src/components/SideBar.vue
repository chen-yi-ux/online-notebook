<template>
  <div class="page">
    <div class="main">
      <Avatar/>
      <div class="item select">
        <svg>
          <use xlink:href="#icon-note"></use>
        </svg>
      </div>
      <div class="item select">
        <svg>
          <use xlink:href="#icon-notebook"></use>
        </svg>
      </div>
      <div class="item select">
        <svg>
          <use xlink:href="#icon-trash"></use>
        </svg>
      </div>
    </div>
    <div class="logout">
      <svg>
        <use xlink:href="#icon-logout"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar"

export default {
  components: {Avatar}
}
</script>

<style lang="less" scoped>
.page {
  width: 80px;
  height: 100vh;
  background: #f8f8f8;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .main {
    margin-left: 10px;
    .item {
      margin-top: 15px;
      padding-top: 4px;
      cursor: pointer;
      display: block;

      &.select {
        box-shadow: 0 0 2px 2px #2bb964;
        border-radius: 8px;
      }
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #e1e1e1;
    padding-top: 10px;
  }
}

svg {
  width: 25px;
  height: 25px;
}
</style>
