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
        let arr = [1,2,3,4,5,6,1,2,3,4,5,6];
        // console.log(_.uniq(arr))
    }
}
</script>

<style scoped lang="less">
    div {
        color: red;
    }
</style>