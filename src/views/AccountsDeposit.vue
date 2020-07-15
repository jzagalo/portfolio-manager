<template lang="pug">
form
    div.inputs
        h1 Deposit
        label
            span Account
            small
                a(v-on:click.prevent="toggleTransfer" href="")
                    span(v-if="!transfer") Transfer
                    span(v-if="transfer") Cancel
        div.transfer-inputs
            div.transfer-form
                label(v-if="transfer") From
                div.input {{ accountName }}
            div.transfer-to(v-if="transfer")
                label To
                select( v-model="accountId")
                    option(
                        v-for="account in accounts"
                        v-bind:key="account.id"
                        v-bind:value="account.id"
                    ) {{ account.name}}
            label Amount
            input(
                type="number"
                v-model.number="amount"
            )
            label Date
            input(
                type="date"
                v-model="date"
            )
    DetailsActionButtons(v-bind:save="save")/
</template>

<script lang="tsx">
import moment from "moment";
import DetailsActionButtons from "@/components/DetailsActionButtons.vue";

import { Vue, Component, Inject} from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";
import { AccountDepositModel, Action, ActionFn, AccountModel,
        ACTION_PUSH_ROUTE, Getter, GETTER_ACCOUNT_DEPOSIT,
        GETTER_ACCOUNTS, GETTER_ACCOUNT, GetterAccount,
        ACTION_ADD_ACCOUNT_DEPOSIT, ACTION_UPDATE_ACCOUNT_DEPOSIT,
        PayloadAddAccountDeposit, PayloadUpdateAccountDeposit,
        GetterAccountDeposit, PayloadPushRoute
    } from "@/store";


interface IQuery {
    id: string;
    accountId: string;
}

@Component({
    components:{
        DetailsActionButtons,
    }
})
export default class AccountsDeposit extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Action(ACTION_ADD_ACCOUNT_DEPOSIT) private readonly addDeposit!: ActionFn<PayloadAddAccountDeposit>;
    @Action(ACTION_UPDATE_ACCOUNT_DEPOSIT) private readonly updateDeposit!: ActionFn<PayloadUpdateAccountDeposit>;
    @Getter(GETTER_ACCOUNT_DEPOSIT) private readonly getterDeposit!: GetterAccountDeposit;

    @Inject() private readonly routingService!: RoutingService;
    @Getter(GETTER_ACCOUNTS) private readonly accounts!: AccountModel[];
    @Getter(GETTER_ACCOUNT) private readonly getterAccount!: GetterAccount;

    private accountId = 0;
    private accountName = "";
    private transfer = false;
    private id = 0;
    private amount = 0;
    private date = moment(Date.now()).format("YYYY-MM-DD");

    private created(){
        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        this.accountId = this.routingService.queryParam<IQuery, number>((x) => x.accountId, parseInt);
        const account = this.getterAccount(this.accountId);
        this.accountName = account.name;

        if(this.routingService.isPreviousRoute(Routes.AccountsDetails) === false) {
            this.pushRoute(
                this.routingService.createRoute(Routes.AccountsDetails, {
                    query: { id: `${this.accountId}`},
                }),
            );
        }

        if(this.id <= 0){
            return;
        }


        this.load();
    }

    private load(){
        const deposit = this.getterDeposit(this.id);
        this.amount = deposit.amount;
        this.date = moment(deposit.date).format("YYYY-MM-DD");
        this.accountId = deposit.accountId;
        this.accountName = deposit.account.name;

        if(this.routingService.isPreviousRoute(Routes.AccountsDetails) === false) {
            this.pushRoute(
                this.routingService.createRoute(Routes.AccountsDetails,{
                    query: { id: `${this.accountId}`}
                }),
            );
        }
    }

    private save(){
       const deposit = new AccountDepositModel({
           accountId: this.accountId,
           amount: this.amount,
           date: moment(this.date).toDate(),
           id: this.id,
       });

       switch(this.id){
           case 0:
             this.addDeposit(deposit);
             return;
           default:
             this.updateDeposit(deposit);
             return;
       }
    }

    private toggleTransfer(){
        this.transfer = !this.transfer;
    }
}
</script>

<style lang="sass" scoped>
.transfer-inputs
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