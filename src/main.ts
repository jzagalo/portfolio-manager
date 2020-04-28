import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store/store'
import { RoutingService } from "@/components/routing/routing-service";
import "@/features/font-awesome";

Vue.config.productionTip = false

const routingService = new RoutingService(store);

new Vue({
  provide: {
    routingService
  },
  router: routingService.router,
  store,
  render: h => h(App)
}).$mount('#app')
