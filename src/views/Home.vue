<template>
  <div class="home">
    <!--    使用局部自定义组件指令-->
    <input type="text" v-jFocus />
    <!--    自定义全局指令v-jzhFocus-->
    <!--    第一步，在main.js使用Vue.directive('指令名',{方法})来指定该自定义指令有什么作用-->
    <!--    第二步，在组件中使用-->
    <!--    <input type="text" v-jzhFocus />-->
    <div v-j-directive:click.stop v-j-reverse>{{ msg }}</div>
    <button @click="msg = 'jzh'">修改msg</button>
    <hr />
    <!--    自定义事件监听-->
    <div v-jOn:click.stop="clickFn">自定义事件指令</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      msg: "hello world",
    };
  },
  methods: {
    clickFn() {
      console.log("自定义点击事件触发");
      // this.msg = "自定义点击事件触发";
    },
  },
  //局部自定义组件指令
  directives: {
    jFocus: {
      inserted: function (el) {
        console.log("自定义局部组件");
        el.focus();
      },
    },
    jDirective: {
      //钩子函数，在固定的时间点自动执行
      //每个钩子函数都有以下参数：
      //el：指令所绑定的元素，用于直接操作DOM
      //vnode：Vue编译生成的虚拟节点
      //binding：一个对象：包含
      // name(指令名),
      // value(指令传的值)，比如v-jFocus='1+1'，绑定值为2
      // expression：字符串形式的指令表达式

      bind: function (el, vnode, binding) {
        console.log("绑定");
        console.log(vnode);
        console.log(binding);
      },
      inserted: function () {
        console.log("插入");
      },
      componentUpdated: function () {
        console.log("组件更新时");
      },
    },
    jReverse: {
      inserted: function (el) {
        el.innerHTML = [...el.innerHTML].reverse().join("");
      },
    },
    jOn: {
      bind: function (el, binding) {
        console.log(binding);
        el.addEventListener(binding.arg, (event) => {
          //是否要调用阻止冒泡事件
          if (binding.modifiers.stop) {
            event.stopPropagation();
          }
          binding.value();
        });
      },
    },
  },
};
</script>
