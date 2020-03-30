import 'normalize.css';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import App from './index.vue'
// import _ from 'underscore'
// Vue.prototype._ = _

new Vue({
    el: '#app',
    render: h => h(App)
  });