<template lang="pug">
  div.home
    button(v-on:click.prevent="click") Test
    HelloWorld(msg="Welcome to Your Vue.js + Typescript App")/  
</template>

<script lang="ts">

import { Vue, Component, Inject } from "vue-property-decorator";
import { Routes, RoutingService } from "@/components/routing";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  }
})

export default class Home extends Vue {
  @Inject() private readonly routingService!: RoutingService;

  click(){
    this.routingService.navigateTo(Routes.About);
  }  
}
</script>


