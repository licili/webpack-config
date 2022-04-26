import "./css/index.css";
import "./css/index.less";
import "./font/iconfont.css";
import imgSrc from "./img/WechatIMG2.jpeg";

const name = "coder";
const arr = ["acb", "cba", "nba"];

arr.forEach((item) => console.log(item));

// createDOM
const divEL = document.createElement("div");
divEL.className = "f18 wh200 bg-red comm border-red withBgImg";
divEL.innerHTML = "Hello world";

// create ImageELement
const imgEL = document.createElement("img");
imgEL.src = imgSrc;
imgEL.onload = function () {
  console.log("img loaded!");
};

// create ICON i
const iEL = document.createElement("i");
iEL.className = "iconfont icon-weixiu";

// insert DOM
document.body.appendChild(divEL);
document.body.appendChild(imgEL);
document.body.append(iEL);

// =================================
// 搭建Vue
import { createApp } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import { sum } from "./js/sayHello";
import axios from "axios";

if (module.hot) {
  module.hot.accept("./js/sayHello.js", () => {
    console.log("sayHello 更新了");
  });
}
// console.log(sum(1, 2));
const app = createApp(App);
app.mount("#app");

axios
  .get("/api/getUserInfo")
  .then((res) => {
    console.log("smgui");
    console.log(res);
  })
  .catch((err) => {
    console.log("error啦");
    console.log(err);
  });
