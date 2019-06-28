import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 1.引入ElementUI组件库
import ElementUI from "element-ui";

// 2.引入css样式
import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.css";

// 3.将ElementUI组件库与vue绑定
Vue.use(ElementUI);

// 注册一个登录守卫
// 三个参数
// to:去往哪个路由组件
// form:从哪个路由组件来
// next: 执行下一步
router.beforeEach((to, from, next) => {
  // 1.判断用户访问的是否是登录页，如果是，就直接放行
  if (to.path === "/login") {
    next();
  }

  // 2.如果用户访问的是其他页面，判断用户是否进行了登录
  //  2.1 如果登录了，直接放行，如果没登录，拦截到登录页
  if (localStorage.getItem("token")) {
    next();
  } else {
    router.push("/login");
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
