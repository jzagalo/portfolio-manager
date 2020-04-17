<template lang="pug">
div#app
  SplashScreen/
  div#nav
    router-link(to="/") Home
    router-link(to="/about") about
  RouterOutlet/

</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import SplashScreen from "./components/SplashScreen";
import RouterOutlet from "@/components/routing/TheRouterOutlet.vue";

@Component({
  components: { SplashScreen, RouterOutlet }
})
export default class App extends Vue {}
</script>

<style lang="sass">
@import "./components/animations/animation"
@include animation-package(".animatable")


#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%

  #nav
    padding: 30px
    a
      font-weight: bold
      color: #2c3e50
      &.router-link-exact-active
        color: #42b983
</style>
