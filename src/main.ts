import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { RoutingService } from "@/components/routing/routing-service";

Vue.config.productionTip = false

const routingService = new RoutingService();

new Vue({
  provide: {
    routingService
  },
  router: routingService.router,
  store,
  render: h => h(App)
}).$mount('#app')
