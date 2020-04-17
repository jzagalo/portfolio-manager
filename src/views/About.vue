<template lang="pug">
  div.about
    h1 This is an about page
    button(v-on:click.prevent="click") Test    
</template>

<script lang="ts">
import { Vue, Component, Inject }  from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";

@Component
export default class About extends Vue{
  @Inject() private readonly routingService!: RoutingService;

  private mounted(){
    this.routingService.navigateTo(Routes.Home);
  }

  private click(){
    this.routingService.navigateTo(Routes.Home);
  }
  
}
</script>
