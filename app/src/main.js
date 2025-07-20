import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");

app.config.globalProperties.$nextTick(() => {
  if (window.componentHandler) {
    window.componentHandler.upgradeAllRegistered();
  }
});
