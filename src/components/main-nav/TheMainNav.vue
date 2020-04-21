<template lang="pug">
    nav.main-nav
        MainNavButton(
            v-bind:icon="'home'"
            v-bind:label="'Home'"
            v-bind:route="home"
        )
        MainNavButton(
            v-bind:icon="'wallet'"
            v-bind:label="'About'"
            v-bind:route="about"
        )
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MainNavButton from "@/components/main-nav/MainNavButton.vue";
import { Routes } from "@/components/routing";


@Component({
    components: {
        MainNavButton,
    }
})
export default class MainNav extends Vue {
    private readonly about = Routes.About;
    private readonly home = Routes.Home;
    
}
</script>

<style lang="sass" scoped>
    .main-nav
        display:flex
        justify-content:center
</style>