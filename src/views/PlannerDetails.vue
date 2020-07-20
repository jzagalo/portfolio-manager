<template lang="pug">
    form
        div.inputs
            h1 Plan Details
            label Name
            input(v-model="name")
            ul
                li(
                    v-for="portfolioCategory in portfolioCategories"
                    v-bind:key="portfolioCategory.id"
                )
                label {{ portfolioCategory.category.text }}
        DetailsActionButtons(v-bind:save="save")/

</template>

<script lang="ts">
import { Vue,  Component, Inject } from 'vue-property-decorator';
import { ACTION_PUSH_ROUTE, PayloadPushRoute, ActionFn, Action } from '../store';
import { RoutingService } from '../components/routing';
import { Routes } from "@/components/animations/types";
import DetailsActionButtons from "@/components/DetailsActionButtons.vue";
import { GETTER_PORTFOLIO_PLAN, Getter, GetterPortfolioPlan,
        PortfolioCategoryModel, 
        } from "@/store";

interface IQuery {
    id: string;
}

@Component({
    components: {
        DetailsActionButtons,
    },
})
export default class PlannerDetails extends Vue{
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Inject() private readonly routingService!: RoutingService;
    @Getter(GETTER_PORTFOLIO_PLAN) private readonly getterPlan!: GetterPortfolioPlan;
    private portfolioCategories: PortfolioCategoryModel[] = [];
    private id = 0;
    private name = "";

    private mounted(){
        if(this.routingService.isPreviousRoute(Routes.Planner) === false){
            this.pushRoute(this.routingService.createRoute(Routes.Planner));
        }

        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        console.log(this.id);

        if(this.id <= 0){
            return;
        }

        this.load();
    }
    
    private load(){
        const plan = this.getterPlan(this.id);
        this.name = plan.name;
        this.portfolioCategories = plan.categories;
    }

    private save(){
        console.log(this.portfolioCategories);
    }

    
}
</script>