<template lang="pug">
form
    div.inputs
        h1 Deposit
        AccountTransfer(
            v-bind:id="accountId"
            v-on:change="accountChange"
        )/

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
import AccountTransfer from "@/components/AccountTransfer.vue";

import { Vue, Component, Inject} from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";
import { AccountDepositModel, Action, ActionFn,
        ACTION_PUSH_ROUTE, Getter, GETTER_ACCOUNT_DEPOSIT,
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
        AccountTransfer
    }
})
export default class AccountsDeposit extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Action(ACTION_ADD_ACCOUNT_DEPOSIT) private readonly addDeposit!: ActionFn<PayloadAddAccountDeposit>;
    @Action(ACTION_UPDATE_ACCOUNT_DEPOSIT) private readonly updateDeposit!: ActionFn<PayloadUpdateAccountDeposit>;
    @Getter(GETTER_ACCOUNT_DEPOSIT) private readonly getterDeposit!: GetterAccountDeposit;

    @Inject() private readonly routingService!: RoutingService;

    private accountId = 0;
    private id = 0;
    private amount = 0;
    private date = moment(Date.now()).format("YYYY-MM-DD");

    private created(){
        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        this.accountId = this.routingService.queryParam<IQuery, number>((x) => x.accountId, parseInt);


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

    private accountChange(id: number){
        this.accountId = id;
    }

    private load(){
        const deposit = this.getterDeposit(this.id);
        this.amount = deposit.amount;
        this.date = moment(deposit.date).format("YYYY-MM-DD");
        this.accountId = deposit.accountId;

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