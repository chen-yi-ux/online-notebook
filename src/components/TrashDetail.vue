<template>
  <div class="trash">
    noteId: {{msg}}
  </div>
</template>

<script>
export default{
  data() {
    return {
      msg: this.$route.params.noteId
    }
  }
}
</script>

<style scoped>
.trash{
  color: red;
}
</style>
