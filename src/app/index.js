import 'normalize.css';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import App from './app.vue'
import $ from 'jquery'
import _ from 'underscore'
Vue.prototype._ = _
Vue.prototype.$ = $ 
new Vue({
  el: '#app',
  render: h => h(App)
});