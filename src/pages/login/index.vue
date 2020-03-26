<template>
  <div>
      login
      <Checkbox :checked.sync="single">Checkbox</Checkbox>
  </div>
</template>

<script>
import Checkbox from 'iview/src/components/checkbox';
export default {
    name: 'login',
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