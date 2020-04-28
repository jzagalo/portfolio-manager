<template lang="pug">
    button.button-icon(v-on:click.prevent="click"  v-bind:class="{ 'active': isActive }")
        FontAwesomeIcon(v-bind:icon="icon")
        label {{ label }}
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Component
export default class MainNavButton extends Vue {
    @Inject() private readonly routingService!: RoutingService;

    @Prop() private readonly icon!: string;
    @Prop({ default: "undefined" }) private readonly label!: string;
    @Prop() private readonly route!: Routes;
    private isActive = false;

    private async created(){
        this.isActive = await this.routingService.isCurrentRouteAsync(this.route);
        this.routingService
            .navigateBack$
            .subscribe(this.setActive);
    }

    private click(){
        this.routingService.navigateTo(this.route);
    }

    private setActive(route: Routes){
        this.isActive = this.route === route;
    }
    
}
</script>

<style lang="sass" scoped>
    .main-nav-button
        padding: 0.75rem 1rem  

        &:hover, &:focus
            color: #ccc;

    .button-icon
        margin-bottom: 0.25rem
        padding: 0.75rem 1rem 
        background: #5848b4
        border: 0
        color: #fff
    .button-label
        margin-bottom: 0
        cursor: pointer
    .active
        background-color: #fff;
        color: violet
        cursor: initial

        &:hover, &:focus
            color: teal;

        label
            cursor: initial

</style>