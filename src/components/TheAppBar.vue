<template lang="pug">
div.app-bar
    div.container
        button.angle-left(
            v-if="showBack"
        )
            FontAwesomeIcon(
                icon="angle-left"
                size="lg"
            )/
        div.title PortFolio Balance
        button.cog
            FontAwesomeIcon(icon="cog")
        
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator';
import { RoutingService, Routes } from './routing';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Component
export default class TheAppBar extends Vue {
    @Inject() private readonly routingService!: RoutingService;

    private showBack = true;

    private back(){
        this.routingService.back();
    }

    private async created(){
        console.log(await this.routingService.currentAsync);     

        this.routingService
            .navigate$
            .subscribe(this.routeChange);         
    }

    private routeChange(route: Routes){
        this.showBack = route !== Routes.Home;
    }
}
</script>

<style lang="sass" scoped>
.app-bar
    .container
        display: flex
        flex-direction: row
        align-items: center
        background: #d4dfff;

        button.angle-left, button.cog
            flex: 0
            padding: 0.75rem 1rem;
            min-height: 2.83rem;
            background: #5848b4;
            border: 0;
            color: #fff;
        .title
            flex: 1
            text-align: center;
            font-weight: 600
            font-size: 1.25rem

</style>