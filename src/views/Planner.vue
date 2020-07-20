<template lang="pug">
    ListView(
        v-bind:items="plans"
        v-bind:onClick="onClick"
        v-bind:onClickCreate="onClickCreate"
        v-bind:renderFn="renderPlan"
    )
</template>

<script lang="tsx">
import { Vue, Component, Inject } from 'vue-property-decorator';
import { GETTER_PORTFOLIO_PLANS, Getter, PortfolioPlanModel } from "@/store";
import ListView from "@/components/ListView.vue";
import { IRoute,  RoutingService } from "@/components/routing";
import { Routes } from "@/components/animations/types";

@Component({
    components: {
        ListView,
    }
})
export default class Planner extends Vue {
    @Inject() private readonly routingService!: RoutingService;    
    @Getter(GETTER_PORTFOLIO_PLANS) private readonly plans!: PortfolioPlanModel[];

    private onClick(plan: PortfolioPlanModel){
        this.routingService.navigateTo(Routes.PlannerDetails, {
            query: { id: `${plan.id}`},
        })
    }

    private onClickCreate(){
       this.routingService.navigateTo(Routes.PlannerDetails, {
            query: { id: "0" },
        })
    }

    private renderPlan(plan: PortfolioPlanModel){
        return <label>{plan.name}</label>
    }


    private created(){
        console.log(this.plans);
    }

}
</script>