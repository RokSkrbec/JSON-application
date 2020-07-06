import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#225aa0',
        secondary: '#eb1f42',
        text: '#253746',
        background: '#f7f7f7',
        success: '#4CAF50',
        error: '#D32F2F'
      }
    }
  }
})

export default vuetify
