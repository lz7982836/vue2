// 数据仓库
// 全局的数据仓库
// 数据发生变化 那么所有使用该数据的模板全部自动更新
import Vue from 'vue';
import _state from './state';
import store from 'storejs';

const state = Vue.observable(_state);
const mutations = {
  increase() {
    state.darkMode = !state.darkMode;
    store.set('darkMode', state.darkMode);
  },
};

export default { state, mutations };
