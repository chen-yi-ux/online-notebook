<template>
  <div class="page">
    <div class="main">
      <div class="title">
        <svg style="width: 64px; height: 64px">
          <use xlink:href="#icon-title"></use>
        </svg>
        <h2>橙子笔记本</h2>
      </div>
      <div class="content">
        <div class="login" v-show="isShowLogin">
          <div class="username">
            <svg style="width: 24px; height: 24px">
              <use xlink:href="#icon-user"></use>
            </svg>
            <input type="text" placeholder="用户名" v-model="login.username">
          </div>
          <div class="password">
            <svg style="width: 20px; height: 20px; margin-right: 3px">
              <use xlink:href="#icon-suo"></use>
            </svg>
            <input :type="type" placeholder="密码" v-model="login.password">
            <div @click="onShowPassword" v-bind:class="{eye: type==='password'}">
              <svg style="width: 20px; height: 20px;">
                <use xlink:href="#icon-eye"></use>
              </svg>
            </div>
            <div @click="onClosePassword" v-bind:class="{eye: type==='text'}">
              <svg style="width: 20px; height: 20px;">
                <use xlink:href="#icon-eye-close"></use>
              </svg>
            </div>
          </div>
          <div class="note" v-bind:class="{error: login.isError}">{{ login.notice }}</div>
          <div class="button" @click="onLogin">登录</div>
          <div class="other">
            <span @click="showRegister">注册</span>
          </div>
        </div>
        <div class="register" v-show="isShowRegister">
          <div class="username">
            <svg style="width: 24px; height: 24px">
              <use xlink:href="#icon-user"></use>
            </svg>
            <input type="text" placeholder="用户名" v-model="register.username">
          </div>
          <div class="password">
            <svg style="width: 20px; height: 20px; margin-right: 3px">
              <use xlink:href="#icon-suo"></use>
            </svg>
            <input :type="type" placeholder="密码" v-model="register.password">
            <div @click="onShowPassword" v-bind:class="{eye: type==='password'}">
              <svg style="width: 20px; height: 20px;">
                <use xlink:href="#icon-eye"></use>
              </svg>
            </div>
            <div @click="onClosePassword" v-bind:class="{eye: type==='text'}">
              <svg style="width: 20px; height: 20px;">
                <use xlink:href="#icon-eye-close"></use>
              </svg>
            </div>
          </div>
          <div class="note" v-bind:class="{error: register.isError}">{{ register.notice }}</div>
          <div class="button" @click="onRegister">注册</div>
          <div class="other">
            <span @click="showLogin">登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth"

export default {
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '注册账号后，请记住用户名和密码',
        isError: false
      },
      type: 'password'
    }
  },
  methods: {
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }

      Auth.login({username: this.login.username, password: this.login.password})
        .then(data => {
          this.login.isError = false
          this.login.notice = ''
          this.$router.push({path: 'notebooks'})
          console.log('tiaozhuan')
        }).catch(data => {
        this.login.isError = true
        this.login.notice = data.msg
      })
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }

      Auth.register({username: this.register.username, password: this.register.password})
        .then(data => {
          this.register.isError = false
          this.register.notice = ''
          this.$router.push({path: 'notebooks'})
          console.log(data)
        }).catch(data => {
        this.register.isError = true
        this.register.notice = data.msg
      })
    },
    onShowPassword() {
      this.type = 'password'
    },
    onClosePassword() {
      this.type = 'text'
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/login.less);
</style>
