<template lang="pug">
    div.accounts-container 
        h1 Accounts 
        
        div.headings
        ListView(
            v-bind:items="accounts"
            v-bind:onClick="onClick"
            v-bind:onClickCreate="onClickCreate"
            v-bind:renderFn="renderAccount"
        )
       
</template>

<script lang="tsx">
import { Vue, Component, Inject } from 'vue-property-decorator';
import {  GETTER_ACCOUNTS, Getter } from "@/store";
import { AccountModel } from "@/store/account-model";
import { IRoute, Routes, RoutingService } from  '@/components/routing';
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { Refs } from "@/components/animations/types";
import ListView from "@/components/ListView.vue";
import { from } from 'rxjs';

@Component({
    components: {
        ListView,
    }
})
export default class Accounts extends Vue {
    @Getter(GETTER_ACCOUNTS) private readonly accounts!: AccountModel[];
    @Inject() private readonly routingService!: RoutingService;

    private onClick(account: AccountModel){
        console.log("click");
    }

    private onClickCreate(){
        console.log("click create");
    }

    private renderAccount(account: AccountModel){
        return (<label>{ account.name }</label>);
    }    
    
}
</script>

<style lang="sass" scoped>
.accounts-container
   padding: 4px

.headings, .accounts
    border-bottom: 1px solid #ccc
    padding: 0.5rem 0
    display: flex
    align-items: center
.name 
    flex: 1
.remove
    min-width: 2.83rem

.accounts .remove
    background-color: darkred

    &:hover, &:focus
        background-color: belge
        color: white

.add
    display: flex
    margin-bottom: 0.75rem

    input
        margin-bottom: 0
        flex: 1

        &:hover, &:focus
            background-color: violet
            color: white
</style>