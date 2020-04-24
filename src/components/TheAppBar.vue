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
        div.title PortFolio Balancer        
        TheAppBarSettings/        
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator';
import { RoutingService, Routes } from './routing';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TheAppBarSettings from "@/components/app-bar/TheAppBarSettings.vue";
import { IRouteState, STATE_ROUTES, State } from "@/store";

@Component({
    components: {
        TheAppBarSettings,
    }
})
export default class TheAppBar extends Vue {
    @Inject() private readonly routingService!: RoutingService;
    @State(STATE_ROUTES) private readonly routeState!: IRouteState;

    private showBack = true;

    private back(){
        this.routingService.back();
    }

    private async created(){
        this.routingService
            .routeChanged$
            .subscribe(this.routeChanged);         
    }   

    private routeChanged(){
        this.showBack = this.routeState.history.length !== 0;
    }
}
</script>

<style lang="sass" scoped>
.app-bar
    z-index: 9000
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