<template>
  <div class="trash">
    noteId: {{ msg }}
  </div>
</template>

<script>
import Auth from '@/apis/auth'

export default {
  data() {
    return {
      msg: this.$route.params.noteId
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
  },
}
</script>

<style scoped>
.trash {
  color: red;
}
</style>
