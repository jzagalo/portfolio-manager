<template lang="pug">
    button.button-icon(v-on:click.prevent="click")
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

    private click(){
        this.routingService.navigateTo(this.route);
    }
    
}
</script>

<style lang="sass" scoped>
    .main-nav-button
        padding: 0.75rem 1rem        
    .button-icon
        margin-bottom: 0.25rem
        padding: 0.75rem 1rem 
        background: #5848b4
        border: 0
        color: #fff
    .button-label
        margin-bottom: 0
</style>