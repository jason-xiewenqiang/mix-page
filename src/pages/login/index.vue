<template>
  <div class="login">
      login
      <Checkbox :checked.sync="single">Checkbox</Checkbox>
  </div>
</template>

<script>
import Checkbox from 'iview/src/components/checkbox';
import $ from 'jquery'
import test from '@/utils/test';
export default {
    components: {Checkbox},
    name: 'login',
    data () {
        return {
            single: false
        }
    },
    mounted () {
        test(3);
        $('body').css('background-color', 'blue')
    }
}
</script>

<style scoped lang="less">
    .login {
        color: red;
    }
</style>