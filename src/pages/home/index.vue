<template>
  <div>home</div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'home',
    mounted () {
        $('body').css('background-color', 'blue')
    }
}
</script>

<style scoped lang="less">
    div {
        color: red;
    }
</style>