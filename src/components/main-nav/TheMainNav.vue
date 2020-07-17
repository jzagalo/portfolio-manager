<template lang="pug">
    nav.main-nav
        div
            MainNavButton(
                v-bind:icon="'home'"
                v-bind:label="'Home'"
                v-bind:route="home"
            )      
            MainNavButton(
                v-bind:icon="'wallet'"
                v-bind:label="'Accounts'"
                v-bind:route="accounts"
            )
            MainNavButton(
                v-bind:icon="'money-bill'"
                v-bind:label="'Securities'"
                v-bind:route="securities"
            )
            MainNavButton(
                v-bind:icon="'chart-pie'"
                v-bind:label="'Planner'"
                v-bind:route="planner"
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
    private readonly accounts = Routes.Accounts;
    private readonly securities = Routes.Securities;
    private readonly planner = Routes.Planner;
    
}
</script>

<style lang="sass" scoped>
    .main-nav
        display:flex
        justify-content:center
        div
        .main-nav-button
            flex: 1
</style>