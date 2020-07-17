<template lang="pug">
form
    div.inputs
        label Security
        AccountTransfer(
            v-bind:id="accountId"
            v-on:change="accountChange")/
        select(v-model="securityId")
            option(
                v-for="security in securities"
                v-bind:key="security.id"
                v-bind:value="security.id"
            ) {{ security.symbol }}
        label Shares
        input(
            type="number"
            v-model.number="shares"
        )
    DetailsActionButtons(v-bind:save="save")/
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator';
import DetailsActionButtons from '@/components/DetailsActionButtons.vue';
import AccountTransfer from "@/components/AccountTransfer.vue";
import { RoutingService, Routes } from '@/components/routing'

import {    Action, ActionFn, ACTION_PUSH_ROUTE, Getter,
            AccountSecurityModel, ACTION_ADD_ACCOUNT_SECURITY,
            ACTION_UPDATE_ACCOUNT_SECURITY, PayloadAddAccountSecurity,
            PayloadUpdateAccountSecurity,
            GETTER_ACCOUNT_SECURITY, GETTER_SECURITIES,
            GetterAccountSecurity, PayloadPushRoute,
            SecurityModel, 
        } from '@/store';

interface IQuery {
    accountId: string;
    id: string;
}

@Component({
    components: {
        DetailsActionButtons,
        AccountTransfer,
    }
})
export default class AccountsSecurity extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Action(ACTION_ADD_ACCOUNT_SECURITY) private readonly addSecurity!: ActionFn<PayloadAddAccountSecurity>;
    @Action(ACTION_UPDATE_ACCOUNT_SECURITY) private readonly updateSecurity!: ActionFn<PayloadUpdateAccountSecurity>;
    @Getter(GETTER_ACCOUNT_SECURITY) private getterAccountSecurity!: GetterAccountSecurity;
    @Getter(GETTER_SECURITIES) private readonly securities!: SecurityModel[];
    @Inject() private readonly routingService!: RoutingService;

    private accountId = 0;
    private id = 0;
    private securityId = 0;
    private shares = 0;

    private accountChange(id: number) {
        this.accountId = id;
    }

    private created(){
        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        this.accountId = this.routingService.queryParam<IQuery, number>((x) => x.accountId, parseInt);

        if(this.routingService.isPreviousRoute(Routes.AccountsDetails) === false) {
            this.pushRoute(
                this.routingService.createRoute(Routes.AccountsDetails, {
                    query: { id: `${this.accountId}`},
                })
            );
        }

        if(this.id <= 0){
            return;
        }

        this.load();
    }

    private load() {
        const accountsSecurity = this.getterAccountSecurity(this.id);
        this.securityId = accountsSecurity.securityId;
        this.shares = accountsSecurity.shares;
    }

    private save (){
       const accountsSecurity = new AccountSecurityModel({
           accountId: this.accountId,
           id: this.id,
           securityId: this.securityId,
           shares: this.shares,
       });

       switch(this.id){
           case 0:
               this.addSecurity(accountsSecurity);
               return;
           default:
               this.updateSecurity(accountsSecurity);
               return;
       }
    }

}
</script>

<style lang="sass" scoped>
.inputs
    display: flex
    margin-right: 0.125rem
    padding: 0 0.25rem
    display: flex
    flex-direction: column
    align-items: stretch

    label
        display: block
        text-align: left
    input, select
        padding: 7px 3px
        margin: 5px 0 15px 0
        font-size: 14px
    select
        width: 100%
</style>