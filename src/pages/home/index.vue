<template>
  <div>home</div>
</template>

<script>
import $ from 'jquery'
import test from '@/utils/test';
export default {
    name: 'home',
    mounted () {
        test(4);
        $('body').css('background-color', 'blue')
    }
}
</script>

<style scoped lang="less">
    div {
        color: red;
    }
</style>