<template lang="pug">
    mixin securityDescriptor(title, computed)
        div(v-if=`${computed}`)
            h2 #{title}
            label Text
            input(type="text" v-model="text")

    div.security-details
        form
            div(v-if="isCategories")
                h2 Category
                label Territory
                select(v-model="categoryTerritory")
                    option(
                        v-for="territory in territories"
                        v-bind:key="territory.id"
                        v-bind:value="territory"
                    ) {{ territory.text }}
                label Type
                select(v-model="categoryType")
                    option(
                        v-for="type in types"
                        v-bind:key="type.id"
                        v-bind:value="type"
                    ) {{ type.text }}
                label Segment
                select(v-model="categorySegment")
                    option(
                        v-for="segment in segments"
                        v-bind:key="segment.id"
                        v-bind:value="segment"
                    ) {{ segment.text }}
            +securityDescriptor("Market", "isMarkets")
            +securityDescriptor("Segment", "isSegments")
            +securityDescriptor("Territory", "isTerritories")
            +securityDescriptor("Type", "isTypes")
</template>

<script lang="ts">

interface IQuery {
    id: string;
    which: string;
}

import { Component, Inject, Vue } from "vue-property-decorator";
import { RoutingService, Routes } from "@/components/routing";
import {
    ACTION_PUSH_ROUTE, Action,
    ActionFn, IRouteState,
    PushRoutePayload,STATE_ROUTES, State,
    GETTER_SECURITY, GETTER_SECURITY_CATEGORY,
    GETTER_SECURITY_MARKET, GETTER_SECURITY_SEGMENT,
    GETTER_SECURITY_TERRITORY, GETTER_SECURITY_TYPE,
    GETTER_SECURITY_SEGMENTS, GETTER_SECURITY_TERRITORIES, GETTER_SECURITY_TYPES,
    Getter, GetterCategory, GetterMarket, GetterSecurity,
    GetterSegment, GetterTerritory, GetterType,
    SecuritySegmentModel, SecurityTerritoryModel, SecurityTypeModel,
} from "@/store";
import { SecurityDescriptors } from "@/views/types";

@Component
export default class SecuritiesDetails extends Vue{
    @Inject() private readonly routingService!: RoutingService;
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PushRoutePayload>;
    @State(STATE_ROUTES) private readonly routeState!: IRouteState;

    @Getter(GETTER_SECURITY_CATEGORY) private getterCategory!: GetterCategory;
    @Getter(GETTER_SECURITY_MARKET) private getterMarket!: GetterMarket;
    @Getter(GETTER_SECURITY) private getterSecurity!: GetterSecurity;
    @Getter(GETTER_SECURITY_SEGMENT) private getterSegment!: GetterSegment;
    @Getter(GETTER_SECURITY_TERRITORY) private getterTerritory!: GetterTerritory;
    @Getter(GETTER_SECURITY_TYPE) private getterType!: GetterType;
    @Getter(GETTER_SECURITY_SEGMENTS) private segments!: SecuritySegmentModel[];
    @Getter(GETTER_SECURITY_TERRITORIES) private territories!: SecurityTerritoryModel[];
    @Getter(GETTER_SECURITY_TYPES) private types!: SecurityTypeModel[];

    private id = 0;
    private text = "";
    private which = SecurityDescriptors.None;
    private categorySegment: SecuritySegmentModel | null = null;
    private categoryTerritory: SecurityTerritoryModel | null = null;
    private categoryType: SecurityTypeModel | null = null;

    private get isMarkets() {
        return this.which === SecurityDescriptors.Markets;
    }
    private get isSegments() {
        return this.which === SecurityDescriptors.Segments;
    }
    private get isTerritories() {
        return this.which === SecurityDescriptors.Territories;
    }
    private get isTypes() {
        return this.which === SecurityDescriptors.Types;
    }
    private get isCategories() {
        return this.which === SecurityDescriptors.Categories;
    }

    private mounted()   {

        if(this.routeState.history.length === 0 || this.routeState.history[0].id !== Routes.Securities){
            this.pushRoute(this.routingService.createRoute(Routes.Securities));
        }

        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        this.which = this.routingService.queryParam<IQuery, SecurityDescriptors>((x) => x.which, parseInt);


        if(this.id <= 0){
            return;
        }

        this.load();
    }

    private load(){
        switch(this.which){
            case SecurityDescriptors.Categories: {
                const category = this.getterCategory(this.id);
                this.categorySegment = category.segment;
                this.categoryTerritory = category.territory;
                this.categoryType = category.type;
                return;
            }
            case SecurityDescriptors.Markets:{
                const market = this.getterMarket(this.id);
                this.text = market.text;
                return;
            }
            case SecurityDescriptors.Securities: {
                const security = this.getterSecurity(this.id);
                console.log(security);
                return;
            }
            case SecurityDescriptors.Segments: {
                const segment = this.getterSegment(this.id);
                this.text = segment.text;
                return;
            }
            case SecurityDescriptors.Territories: {
                const territory = this.getterTerritory(this.id);
                this.text = territory.text;
                return;
            }
             case SecurityDescriptors.Types: {
                const type = this.getterType(this.id);
                this.text = type.text;
                return;
             }
            default:
                return;
        }
    }
}
</script>