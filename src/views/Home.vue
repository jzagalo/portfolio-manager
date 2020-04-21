<template lang="pug">
  div.home    
    HelloWorld(msg="Welcome to Your Vue.js + Typescript App")/  
    MainNavButton(
            v-bind:icon="'wallet'"
            v-bind:label="'About'"
            v-bind:route="about"
        )
</template>

<script lang="ts">

import { Vue, Component, Inject } from "vue-property-decorator";
import { Routes, RoutingService } from "@/components/routing";
import HelloWorld from "@/components/HelloWorld.vue";
import MainNavButton from "@/components/main-nav/MainNavButton.vue";

@Component({
  components: {
    HelloWorld,
    MainNavButton
  }
})

export default class Home extends Vue {
  @Inject() private readonly routingService!: RoutingService;  
  private readonly about = Routes.About;
  private readonly home = Routes.Home;
 
}
</script>

<style lang="sass" scoped>
.home
  height: 2000px
</style>

