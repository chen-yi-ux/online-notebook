<template>
  <div class="avatar">
    {{slug}}
  </div>
</template>

<script>
export default{
  data(){
    return {
      user: {
        username: 'chenyi'
      },
      slug: 'c'
    }
  }
}
</script>

<style lang="less" scoped>
.avatar{
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: #f2b81c;
  color: white;
  font-weight: bold;
  font-size: 22px;
  border-radius: 50%;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 1px 0 1px #795c19;
  margin-top: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
