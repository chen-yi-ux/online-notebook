<template>
  <div class="page">
    <div class="main">
      <Avatar/>
      <router-link class="item" to="/note">
        <svg>
          <use xlink:href="#icon-note"></use>
        </svg>
      </router-link>
      <router-link class="item" to="/notebooks">
        <svg>
          <use xlink:href="#icon-notebook"></use>
        </svg>
      </router-link>
      <router-link class="item" to="/trash">
        <svg>
          <use xlink:href="#icon-trash"></use>
        </svg>
      </router-link>
    </div>
    <div class="logout" @click="onLogout">
      <svg>
        <use xlink:href="#icon-logout"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar"
import {mapActions} from 'vuex'

export default {
  components: {Avatar},
  data(){
    return {
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    onLogout() {
      this.logout()
    }
  }
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
    width: 100%;

    .item {
      margin-top: 15px;
      padding-top: 4px;
      cursor: pointer;
      display: block;
      width: 80px;

    }
    .router-link-active{
      background: #e2fae8;
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
