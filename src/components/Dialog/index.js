import Vue from 'vue';
import Dialog from './Dialog.vue';

//创建一个Dialog的vue子类
export default function (option) {
  return new Promise(function (resolve, reject) {
    const VueDialog = Vue.extend(Dialog);
    const instanceOfVueDialog = new VueDialog({
      data() {
        return {
          title: option.title,
          message: option.message,
          visible: true,
        };
      },
      methods: { resolve, reject },
    });
    instanceOfVueDialog.$mount();
    document.querySelector('body').appendChild(instanceOfVueDialog.$el);
  });
}

// Dialog.install = function (V) {
//   V.component(this.name, this);
// };
// export default Dialog;
