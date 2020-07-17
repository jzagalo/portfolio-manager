<template lang="pug">

    TabContainer(v-bind:tabs="tabs")
        TabEntry
            ListView(
                v-bind:items="securities"
                v-bind:onClick="onClickFactory(descriptorSecurities)"
                v-bind:onClickCreate="onClickCreateFactory(descriptorSecurities)"
                v-bind:renderFn="renderFnSecurity"
            )/
        TabEntry
            ListView(
                v-bind:items="categories"
                v-bind:onClick="onClickFactory(descriptorCategories)"
                v-bind:onClickCreate="onClickCreateFactory(descriptorCategories)"
                v-bind:renderFn="renderFnCategory"
            )/
        TabEntry
            ListView(
                v-bind:items="markets"
                v-bind:onClick="onClickFactory(descriptorMarkets)"
                v-bind:onClickCreate="onClickCreateFactory(descriptorMarkets)"
                v-bind:renderFn="renderFnDescriptor"
            )/
        TabEntry
            ListView(
            v-bind:items="segments"
            v-bind:onClick="onClickFactory(descriptorSegments)"
            v-bind:onClickCreate="onClickCreateFactory(descriptorSegments)"
            v-bind:renderFn="renderFnDescriptor"
            )/
        TabEntry
            ListView(
                v-bind:items="territories"
                v-bind:onClick="onClickFactory(descriptorTerritories)"
                v-bind:onClickCreate="onClickCreateFactory(descriptorTerritories)"
                v-bind:renderFn="renderFnDescriptor"
            )/
        TabEntry
            ListView(
                v-bind:items="types"
                v-bind:onClick="onClickFactory(descriptorTypes)"
                v-bind:onClickCreate="onClickCreateFactory(descriptorTypes)"
                v-bind:renderFn="renderFnDescriptor"
            )/
</template>
<script lang="tsx">

import { Vue, Component, Inject } from 'vue-property-decorator';
import { GETTER_SECURITIES, GETTER_SECURITY_CATEGORIES,
        Getter, SecurityCategoryModel, SecurityModel,
        ISecurityMarketsModelState, SecurityDescriptor,
        STATE_SECURITY_MARKETS, State,
        ISecuritySegmentModelState,
        ISecurityTerritoryModelState,
        ISecurityTypeModelState,
        SecurityMarketModel,
        SecuritySegmentModel,
        SecurityTerritoryModel,
        SecurityTypeModel,
        STATE_SECURITY_SEGMENTS,
        STATE_SECURITY_TERRITORIES,
        STATE_SECURITY_TYPES,
        GETTER_SECURITY_MARKETS,
        GETTER_SECURITY_SEGMENTS,
        GETTER_SECURITY_TERRITORIES,
        GETTER_SECURITY_TYPES,
         } from "@/store";
import ListView from "@/components/ListView.vue";
import TabContainer from "@/components/tabs/TabContainer.vue";
import TabEntry from "@/components/tabs/TabEntry.vue";
import TabHeader from "@/components/tabs/TabHeader.vue";
import { SecurityDescriptors } from "@/views/types";
import { IRoute, Routes, RoutingService, } from "@/components/routing";

enum Descriptors {
    Markets,
    Segments,
    Territories,
    Types,
}

@Component({
    components: {
        ListView,
        TabContainer,
        TabEntry,
        TabHeader
    }
})
export default class Securities extends Vue {
    @Getter(GETTER_SECURITIES) private readonly securities!: SecurityModel[];
    @Getter(GETTER_SECURITY_CATEGORIES) private readonly categories!: SecurityCategoryModel[];
    @Getter(GETTER_SECURITY_MARKETS) private readonly marketss!: SecurityMarketModel[];
    @Getter(GETTER_SECURITY_SEGMENTS) private readonly segmentss!: SecuritySegmentModel[];
    @Getter(GETTER_SECURITY_TERRITORIES) private readonly territoriess!: SecurityTerritoryModel[];
    @Getter(GETTER_SECURITY_TYPES) private readonly typess!: SecurityTypeModel[];

    @State(STATE_SECURITY_MARKETS) private readonly marketState!: ISecurityMarketsModelState;
    @State(STATE_SECURITY_SEGMENTS) private readonly segmentState!: ISecuritySegmentModelState;
    @State(STATE_SECURITY_TERRITORIES) private readonly territoryState!: ISecurityTerritoryModelState;
    @State(STATE_SECURITY_TYPES) private readonly typeState!: ISecurityTypeModelState;

    @Inject() private readonly routingService!: RoutingService;

    private readonly descriptorCategories = SecurityDescriptors.Categories;
    private readonly descriptorMarkets = SecurityDescriptors.Markets;
    private readonly descriptorSecurities = SecurityDescriptors.Securities;
    private readonly descriptorSegments = SecurityDescriptors.Segments;
    private readonly descriptorTerritories = SecurityDescriptors.Territories;
    private readonly descriptorTypes = SecurityDescriptors.Types;

    private readonly tabs = [
        "Securities",
        "Categories",
        "Markets",
        "Segments",
        "Territories",
        "Types",
    ];


    private get segments() { return this.segmentState.items; }
    private get territories() { return this.territoryState.items; }
    private get types() { return this.typeState.items; }

    private get markets(){ return this.marketState.items; }

    private onClickDescriptorFactory(which: Descriptors){
        return(descriptor: SecurityDescriptor) => {
            this.onClickDescriptor(which, descriptor);
        }
    }
    private onClickDescriptor(which: Descriptors, descriptor: SecurityDescriptor){
        console.log(`${Descriptors[which]} ${descriptor.id}`);
    }

    private renderFnDescriptor(descriptor: SecurityDescriptor){
        return(
            <div>
                <label>{ descriptor.text }</label>
            </div>
        );
    }

    private created(){ }

    private onClickCreateFactory(which: SecurityDescriptors){
        console.log("Tristian");
        return () => {

           this.routingService.navigateTo(Routes.SecuritiesDetails, {
               query: {id: "0", which: `${which}`},
           });
        }
    }

    private onClickFactory(which: SecurityDescriptors){
        console.log(which);
        return (descriptor: SecurityModel | SecurityCategoryModel | SecurityDescriptor ) => {
            this.routingService.navigateTo(
                Routes.SecuritiesDetails, {
                    query: {id: `${descriptor.id}`, which: `${which}`},
                }
            );
        }
    }

    private renderFnCategory(category: SecurityCategoryModel){

        return (
            <div>
                <label>{category.text} </label>
                <small> {category.abbreviation} </small>
            </div>
        );
    }

    private renderFnSecurity(security: SecurityModel) {
        return (
            <div>
                <label>{security.symbol} </label>
                <small> {security.category!.abbreviation} </small>
            </div>
        );
    }

}
</script>

<style lang="sass" scoped>
    .list-item-content
        display: flex
        align-items: center
        padding: 0.75rem 0.5rem
        text-decoration: none
        border-bottom: 1px solid grey;

        > *
            pointer-events: none

        .list-item-text
            flex: 1 

            .account-deposit
                display: flex

                > *
                    flex: 1


    /deep/ .tab-headings li a
        min-width: 6.3125rem

</style>