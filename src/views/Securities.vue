<template lang="pug">
    div
        ListView(
            v-bind:items="securities"
            v-bind:onClick="onClickSecurity"
            v-bind:renderFn="renderFnSecurity"
        )/
        ListView(
            v-bind:items="categories"
            v-bind:onClickSecurity="onClickCategory"
            v-bind:renderFn="renderFnCategory"
        )/
        ListView(
        v-bind:items="markets"
        v-bind:onClick="onClickDescriptorFactory(descriptorMarkets)"
        v-bind:renderFn="renderFnDescriptor")/
        ListView(
        v-bind:items="segments"
        v-bind:onClick="onClickDescriptorFactory(descriptorSegments)"
        v-bind:renderFn="renderFnDescriptor")/
        ListView(
            v-bind:items="territories"
            v-bind:onClick="onClickDescriptorFactory(descriptorTerritories)"
            v-bind:renderFn="renderFnDescriptor")/
        ListView(
            v-bind:items="types"
            v-bind:onClick="onClickDescriptorFactory(descriptorTypes)"
            v-bind:renderFn="renderFnDescriptor")/
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
        STATE_SECURITY_SEGMENTS,
        STATE_SECURITY_TERRITORIES,
        STATE_SECURITY_TYPES,
         } from "@/store";
import ListView from "@/components/ListView.vue";

enum Descriptors {
    Markets,
    Segments,
    Territories,
    Types,
}

@Component({
    components: {
        ListView,
    }
})
export default class Securities extends Vue {
    @Getter(GETTER_SECURITIES) private readonly securities!: SecurityModel[];
    @Getter(GETTER_SECURITY_CATEGORIES) private readonly categories!: SecurityCategoryModel[];
    @State(STATE_SECURITY_MARKETS) private readonly marketState!: ISecurityMarketsModelState;    
    @State(STATE_SECURITY_SEGMENTS) private readonly segmentState!: ISecuritySegmentModelState;
    @State(STATE_SECURITY_TERRITORIES) private readonly territoryState!: ISecurityTerritoryModelState;
    @State(STATE_SECURITY_TYPES) private readonly typeState!: ISecurityTypeModelState;

    private readonly descriptorMarkets = Descriptors.Markets;
    private readonly descriptorSegments = Descriptors.Segments;
    private readonly descriptorTerritories = Descriptors.Territories;
    private readonly descriptorTypes = Descriptors.Types;

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

</style>