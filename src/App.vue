<template lang="pug">
div#app
  SplashScreen/  
  AppBar.app-app-bar/
  RouterOutlet.app-router-outlet/
  MainNav.app-main-nav/

</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import SplashScreen from "./components/SplashScreen";
import RouterOutlet from "@/components/routing/TheRouterOutlet.vue";
import AppBar from "@/components/TheAppBar";
import MainNav from "@/components/main-nav/TheMainNav";

@Component({
  components: { SplashScreen, RouterOutlet, AppBar, MainNav}
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
  display:grid
  grid-template-rows: auto minmax(0, 1fr) auto
  grid-template-areas: "app-app-bar" "app-router-outlet" "app-main-nav"
  height: 100%
  overflow: hidden
  padding-bottom: 50px

.app-app-bar
  grid-area: app-app-bar

.app-router-outlet
  grid-area: app-router-outlet
  overflow: auto

.app-main-nav
  grid-area: app
  position: fixed
  bottom: 0
  left: 0
  right: 0 


  #nav
    padding: 30px
    a
      font-weight: bold
      color: #2c3e50
      &.router-link-exact-active
        color: #42b983
</style>
