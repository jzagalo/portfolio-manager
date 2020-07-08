<template lang="pug">
    mixin securityDescriptor(title, computed)
        div(v-if=`${computed}`)
            h2 #{title}
            label Text
            input(type="text" v-model="text")

    div.security-details
        form
            div(v-if="isSecurities")
                h2 Security
                label Symbol
                input(
                    type="text"
                    v-model="securitySymbol"
                )
                label Last
                input(
                    type="number"
                    step="0.01"
                    v-model.number="securityLast"
                )
                label Category
                select(v-model="securityCategory")
                    option(
                        v-for="category in categories"
                        v-bind:key="category.id"
                        v-bind:value="category"
                    ) {{ category.text }}
                label Market
                select(v-model="securityMarket")
                    option(
                        v-for="market in markets"
                        v-bind:key="market.id"
                        v-bind:value="market"
                    ) {{ market.text}}
                label Recommendation
                select(v-model="securityRecommendation")
                    option(
                        v-for="recommendation in recommendations"
                        v-bind:key="recommendation.id"
                        v-bind:value="recommendation.id"
                    ) {{ recommendation.text }}

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
            DetailsActionButtons(v-bind:save="save")/
</template>

<script lang="ts">

interface IQuery {
    id: string;
    which: string;
}

import { Component, Inject, Vue } from "vue-property-decorator";
import { RoutingService, Routes } from "@/components/routing";
import DetailsActionButtons from "@/components/DetailsActionButtons.vue";
import {
    ACTION_PUSH_ROUTE, Action,
    ActionFn, IRouteState,
    PushRoutePayload,STATE_ROUTES, State,
    ACTION_UPDATE_SECURITY,
    ACTION_UPDATE_SECURITY_CATEGORY,
    ACTION_UPDATE_SECURITY_MARKET,
    ACTION_UPDATE_SECURITY_SEGMENT,
    ACTION_UPDATE_SECURITY_TERRITORY,
    ACTION_UPDATE_SECURITY_TYPE,
    GETTER_SECURITY, GETTER_SECURITY_CATEGORY,
    GETTER_SECURITY_MARKET, GETTER_SECURITY_SEGMENT,
    GETTER_SECURITY_TERRITORY, GETTER_SECURITY_TYPE,
    GETTER_SECURITY_SEGMENTS, GETTER_SECURITY_TERRITORIES, GETTER_SECURITY_TYPES,
    GETTER_SECURITY_CATEGORIES, GETTER_SECURITY_MARKETS,
    Getter, GetterCategory, GetterMarket, GetterSecurity,
    GetterSegment, GetterTerritory, GetterType,
    SecuritySegmentModel, SecurityTerritoryModel, SecurityTypeModel,
    SecurityCategoryModel, SecurityMarketModel, SecurityRecommendations,
    PayloadUpdateSecurity,
    PayloadUpdateSecurityCategory,
    PayloadUpdateSecurityMarket,
    PayloadUpdateSecuritySegment,
    PayloadUpdateSecurityTerritory,    
    PayloadUpdateSecurityType,
    SecurityModel,
} from "@/store";
import { SecurityDescriptors } from "@/views/types";

type ActionUpdateTerritory = ActionFn<PayloadUpdateSecurityTerritory>;

@Component({
    components:{ 
        DetailsActionButtons,
    }
})
export default class SecuritiesDetails extends Vue{

    
    @Inject() private readonly routingService!: RoutingService;
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PushRoutePayload>;
    @Action(ACTION_UPDATE_SECURITY) private readonly updateSecurity!: ActionFn<PayloadUpdateSecurity>;
    @Action(ACTION_UPDATE_SECURITY_CATEGORY) private readonly updateCategory!: ActionFn<PayloadUpdateSecurityCategory>;
    @Action(ACTION_UPDATE_SECURITY_MARKET) private readonly updateMarket!: ActionFn<PayloadUpdateSecurityMarket>;
    @Action(ACTION_UPDATE_SECURITY_SEGMENT) private readonly updateSegment!: ActionFn<PayloadUpdateSecuritySegment>;
    @Action(ACTION_UPDATE_SECURITY_TERRITORY) private readonly updateTerritory!: ActionUpdateTerritory;
    @Action(ACTION_UPDATE_SECURITY_TYPE) private readonly updateType!: ActionFn<PayloadUpdateSecurityType>;
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
    @Getter(GETTER_SECURITY_CATEGORIES) private categories!: SecurityCategoryModel[];
    @Getter(GETTER_SECURITY_MARKETS) private markets!: SecurityMarketModel[];

    private id = 0;
    private text = "";
    private which = SecurityDescriptors.None;
    private categorySegment: SecuritySegmentModel | null = null;
    private categoryTerritory: SecurityTerritoryModel | null = null;
    private categoryType: SecurityTypeModel | null = null;

    private securityCategory: SecurityCategoryModel | null = null;
    private securityLast = 0;
    private securityMarket: SecurityMarketModel|null = null;
    private securityRecommendation = SecurityRecommendations.Buy;
    private securitySymbol = "";

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
    private get isSecurities(){
        return this.which === SecurityDescriptors.Securities;
    }
    private get recommendations(){
        return Object.keys(SecurityRecommendations)
                    .filter((x) => isNaN(Number(x)) === false)
                    .map((x) => parseInt(x, 10))
                    .map((x) => ({ id: x, text: SecurityRecommendations[x] }));
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
                this.securityCategory = security.category;
                this.securityLast = security.last;
                this.securityMarket = security.market;
                this.securityRecommendation = security.recommendation;
                this.securitySymbol = security.symbol;
            }
            return;
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

            default: {
                return;
            }
        }
    }

    public save(){
        switch(this.which){
            case SecurityDescriptors.Categories:{
                const category = new SecurityCategoryModel({
                    id: this.id,
                    segmentId: this.categorySegment!.id,
                    territoryId: this.categoryTerritory!.id,
                    typeId:this.categoryType!.id,
                });
                switch(this.id) {
                    case 0:
                        return;
                    default:
                        this.updateCategory(category);
                        return;
                }              
            }
            case SecurityDescriptors.Markets: {
                const market = new SecurityMarketModel(this.id, this.text);
                switch(this.id){
                    case 0:
                        return;
                    default:
                        this.updateMarket(market);
                        return;
                }                
            }
            case SecurityDescriptors.Securities:{
                const security = new SecurityModel({
                    categoryId: this.securityCategory!.id,
                    id: this.id,
                    last: this.securityLast,
                    marketId: this.securityMarket!.id,
                    recommendation: this.securityRecommendation,
                    symbol: this.securitySymbol,
                });
                switch(this.id){
                    case 0:
                        return;
                    default:
                        this.updateSecurity(security);
                        return;
                }
            }
            case SecurityDescriptors.Segments:{
                const segment = new SecuritySegmentModel(this.id, this.text);
                switch(this.id){
                    case 0:
                        return;
                    default:
                        this.updateSegment(segment);
                        return;
                }
            }
            case SecurityDescriptors.Territories: {
                const territory = new SecurityTerritoryModel(this.id, this.text);
                switch(this.id) {
                    case 0:
                        return;
                    default:
                        this.updateTerritory(territory);
                        return;

                }
            }
            case SecurityDescriptors.Types: {
                const type = new SecurityTypeModel(this.id, this.text);
                switch(this.id){
                    case 0:
                        return;
                    default:
                        this.updateType(type);
                        return;
                }
            }
        }
    }
}
</script>