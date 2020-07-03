<template lang="pug">
   
    TabContainer(v-bind:tabs="tabs") 
        TabEntry       
            ListView(
                v-bind:items="securities"
                v-bind:onClick="onClickSecurity"
                v-bind:renderFn="renderFnSecurity"
            )/ 
        TabEntry      
            ListView(
                v-bind:items="categories"
                v-bind:onClickSecurity="onClickCategory"
                v-bind:renderFn="renderFnCategory"
            )/ 
        TabEntry           
            ListView(
                v-bind:items="markets"
                v-bind:onClick="onClickDescriptorFactory(descriptorMarkets)"
                v-bind:renderFn="renderFnDescriptor"
            )/   
        TabEntry  
            ListView(
            v-bind:items="segments"
            v-bind:onClick="onClickDescriptorFactory(descriptorSegments)"
            v-bind:renderFn="renderFnDescriptor"
            )/  
        TabEntry       
            ListView(
                v-bind:items="territories"
                v-bind:onClick="onClickDescriptorFactory(descriptorTerritories)"
                v-bind:renderFn="renderFnDescriptor"
            )/  
        TabEntry       
            ListView(
                v-bind:items="types"
                v-bind:onClick="onClickDescriptorFactory(descriptorTypes)"
                v-bind:renderFn="renderFnDescriptor"
            )/
</template>
<script lang="tsx">

import {Vue, Component } from 'vue-property-decorator';
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

    private readonly descriptorMarkets = Descriptors.Markets;
    private readonly descriptorSegments = Descriptors.Segments;
    private readonly descriptorTerritories = Descriptors.Territories;
    private readonly descriptorTypes = Descriptors.Types;

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
        console.log(descriptor.text);
        return(
            <div>
                <label>{ descriptor.text }</label>
            </div>
        );
    }

    private created(){
        //console.log(this.securities);
        //console.log(this.categories);
    }

    private onClickCategory(category: SecurityCategoryModel){
        //console.log(category);
    }

    private onClickSecurity(security: SecurityModel){
        //console.log(security);
    }

    private renderFnCategory(category: SecurityCategoryModel){
        console.log(category);
        return (
            <div>
                <label>{category.text} </label>
                <small> {category.abbreviation} </small>
            </div>
        );
    }

    private renderFnSecurity(security: SecurityModel){
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
    
    /deep/ .tab-headings li a
        min-width: 6.3125rem

</style>