//也可以自定义一个指令文件
import Vue from "vue";
Vue.directive("jzhFocus", {
  inserted: function (el) {
    console.log("自定义指令执行");
    el.focus();
  },
});
