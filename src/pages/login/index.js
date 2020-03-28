import 'normalize.css';
import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import App from './index.vue'
import zTree from 'ztree'
Vue.prototype.$zTree = zTree

new Vue({
    el: '#app',
    render: h => h(App)
  });