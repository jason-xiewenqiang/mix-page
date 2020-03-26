<template>
  <div>app
      <Checkbox :checked.sync="single">Checkbox</Checkbox>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            single: false
        }
    }
}
</script>

<style scoped lang="less">
    div {
        color: red;
    }
</style>