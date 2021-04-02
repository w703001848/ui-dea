import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../storage'
import { themeColor, themeType } from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';

Vue.use(Vuex)

const THEMECOLOR = storage.get('themeColor');
const THEMETYPE = storage.get('themeType');

export default new Vuex.Store({
  state: {
    designId: storage.get('designId') || 1,
    themeColor: THEMECOLOR,
    themeType: THEMETYPE,
  },
  getters: {
		// 主题风格配置
		themeColor: state => {
			let theme = state.themeColor;
			if (!theme) {
				theme = themeColor.filter((item) => item.name === $mSettingConfig['styleColor'])[0];
			}
			return theme;
		},
		// 主题配色配置
		themeType: state => {
			let theme = state.themeType;
			if (!theme) {
				theme = themeType.filter((item) => item === $mSettingConfig['styleType'])[0];
			}
			return theme;
		},
  },
  mutations: {
    setDesignId(state, val){
      storage.set('designId', val);
      state.designId = val;
    },
		setThemeColor(state, val) {
			state.themeColor = val;
			storage.set('themeColor', val);
		},
		setThemeType(state, val) {
			state.themeType = val;
			storage.set('themeType', val);
		},
  },
  actions: {
  },
  modules: {
  }
})
