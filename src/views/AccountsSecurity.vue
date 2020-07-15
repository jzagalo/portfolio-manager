<template lang="pug">
form
    div.inputs
        label Security
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
import { RoutingService, Routes } from '@/components/routing'

import {    Action, ActionFn, ACTION_PUSH_ROUTE, Getter,
            GETTER_ACCOUNT, GETTER_ACCOUNT_SECURITY, GETTER_SECURITIES,
            GetterAccount, GetterAccountSecurity, PayloadPushRoute,
            SecurityModel,
        } from '@/store';
        
interface IQuery {
    accountId: string;
    id: string;
}

@Component({
    components: {
        DetailsActionButtons,
    }
})
export default class AccountsSecurity extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Getter(GETTER_ACCOUNT) private readonly getterAccount!: GetterAccount;
    @Getter(GETTER_ACCOUNT_SECURITY) private getterAccountSecurity!: GetterAccountSecurity;
    @Getter(GETTER_SECURITIES) private readonly securities!: SecurityModel[];
    @Inject() private readonly routingService!: RoutingService;

    private accountId = 0;
    private accountName = "";
    private id = 0;
    private securityId = 0;
    private shares = 0;

    private created(){
        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        this.accountId = this.routingService.queryParam<IQuery, number>((x) => x.accountId, parseInt);

        const account = this.getterAccount(this.accountId);
        this.accountName = account.name;

        if(this.routingService.isPreviousRoute(Routes.AccountsDetails) === false){
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
        console.log("save");
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