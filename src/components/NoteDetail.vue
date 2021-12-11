<template>
  <div class="notes">
    noteId: {{msg}}
  </div>
</template>

<script>
export default{
  data(){
    return {
      msg: this.$route.params.noteId
    }
  }
}
</script>

<style scoped>
.notes{
  color: red;
}
</style>
