import 'normalize.css';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import App from './app.vue'
import Checkbox from 'iview/src/components/checkbox';
import DatePicker from 'iview/src/components/date-picker';
Vue.use(Checkbox)
Vue.use(DatePicker)
new Vue({
    el: '#app',
    render: h => h(App)
  });