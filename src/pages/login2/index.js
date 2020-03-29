import 'normalize.css';
import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import App from './index.vue'
import 'ztree'
import 'ztree/css/zTreeStyle/zTreeStyle.css';

new Vue({
    el: '#app',
    render: h => h(App)
  });