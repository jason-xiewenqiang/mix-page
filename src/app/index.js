import 'normalize.css';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import App from './app.vue'
import iview from 'iview';
import $ from 'jquery'
Vue.use(iview)
Vue.prototype.$ = $ 
new Vue({
  el: '#app',
  render: h => h(App)
});