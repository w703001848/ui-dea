import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import storage from './storage';

import settingConfig from './config/setting.config.js';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI);

Vue.prototype.$storage = storage;

Vue.prototype.$settingConfig = settingConfig;

Vue.mixin({
	computed: {
		themeColor: {
			get() {
				return store.getters.themeColor;
			},
			// set(val) {
			// 	store.state.themeColor = val;
			// }
		},
		themeType: {
			get() {
				return store.getters.themeType;
			},
			// set(val) {
			// 	store.state.themeColor = val;
			// }
		}
	}
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
