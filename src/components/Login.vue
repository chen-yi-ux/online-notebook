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
          <div class="note" v-bind:class="{error: login.isError}">{{login.notice}}</div>
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
          <div class="note" v-bind:class="{error: register.isError}">{{register.notice}}</div>
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
    onLogin(){
      if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)){
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if(!/^.{6,16}$/.test(this.login.password)){
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.login.isError = false
      this.login.notice = ''
      console.log(`登录，用户名是：${this.login.username}，密码是：${this.login.password}`)
    },
    onRegister(){
      if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)){
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if(!/^.{6,16}$/.test(this.register.password)){
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }
      this.register.isError = false
      this.register.notice = ''
      console.log(`注册，用户名是：${this.register.username}，密码是：${this.register.password}`)
    },
    onShowPassword(){
      this.type = 'password'
    },
    onClosePassword(){
      this.type = 'text'
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  background: #fafafa;
  display: flex;
  justify-content: center;

  > .main {
    width: 400px;
    background: white;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    margin-top: 40px;
    margin-bottom: 20px;

    > .title {
      text-align: center;
      padding-top: 20px;
    }

    > .content {
      padding: 0 40px;

      .login .register {
        height: 0;
        overflow: hidden;

        &.show {
          height: 250px;
        }
      }
    }
  }

}
.username{
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 4px;

}
.password{
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 4px;
}
input {
  display: block;
  flex: 1;
  height: 35px;
  border-radius: 4px;
  border: none;
  padding: 0 6px;
  color: #595959;
  font-size: 16px;
  outline: none;
}

.username:focus-within {
  box-shadow: 0 0 4px 1px #9dcaf8;
}
.password:focus-within {
  box-shadow: 0 0 4px 1px #9dcaf8;
}

.note {
  font-size: 14px;
  color: #595959;
  margin: 10px 0;
}

.button {
  width: 100%;
  background: #2bb964;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  margin-top: 18px;
}
.error{
  color: red;
}

.other {
  font-size: 14px;
  margin-top: 10px;
  direction: rtl;
  color: #096dd9;
}
svg{
  padding-left: 2px;
}
.eye{
  display: none;
}
</style>
