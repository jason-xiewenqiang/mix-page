<template>
  <div class="login">
      login
      <Checkbox :checked.sync="single">Checkbox</Checkbox>
      <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容xxx</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容111</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import Checkbox from 'iview/src/components/checkbox';
import TabPane from 'iview/src/components/tab-pane';
import Tabs from 'iview/src/components/tabs';
import $ from 'jquery'
import test from '../../utils/test';
export default {
    name: 'login',
    components: {Checkbox, TabPane, Tabs},
    data () {
        return {
            single: false
        }
    },
    async mounted () {
        test(1);
        const res = await this.getUser();
        console.log(res)
        $('body').css('background-color', 'rgba(0,0,0,.25)')
    },
    methods: {
        getUser() {
            return new Promise((s,j) => {
                setTimeout(() => {
                    s('hahha')
                }, 3000)
            })
        }
    }
}
</script>

<style scoped lang="less">
    .login {
        color: red;
    }
</style>