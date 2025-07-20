import { createApp, nextTick } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");

nextTick(() => {
  if (window.componentHandler) {
    window.componentHandler.upgradeAllRegistered();
  }
});
