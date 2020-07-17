<template lang="pug">
div
    div
        form
            div.inputs
                h1 Account Details
                label Name
                input(
                    type="text"
                    v-model="name"
                )
                label Cash
                input(
                    type="number"
                    v-model="cash"
                )
            DetailsActionButtons(v-bind:save="save")
    div(class="account-stats")
        div
            label value
            div {{ currency.format(value) }}
        div
            label Total deposits
            div {{ currency.format(profit) }}
        div
            label Profit
            div {{ currency.format(profit) }}
        div
            label ROI
            div {{ roi }}
    TabContainer(v-bind:tabs="tabs")
        ListView(
            v-bind:headings="accountSecurityHeadings"
            v-bind:items="accountSecurities"
            v-bind:onClick="handleClickAccountSecurity"
            v-bind:onClickCreate="handleClickCreateAccountSecurity"
            v-bind:renderFn="renderSecurity"
        )
        ListView(
            v-bind:headings="accountDepositHeadings"
            v-bind:items="accountDeposits"
            v-bind:onClick="handleClickAccountDeposit"
            v-bind:onClickCreate="handleClickCreateAccountDeposit"
            v-bind:renderFn="renderDeposit"
        )
</template>

<script lang="tsx">
import DetailsActionButtons from "@/components/DetailsActionButtons.vue";
import { Vue, Component, Inject } from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";
import { ACTION_PUSH_ROUTE, Action, ActionFn, GETTER_ACCOUNT, Getter,
        GetterAccount, PayloadPushRoute, AccountDepositModel,
        AccountSecurityModel
    } from "@/store";
import { currencyFormatter } from "@/store/functions";
import ListView from "@/components/ListView.vue";
import TabContainer from "@/components/tabs/TabContainer.vue";

interface IQuery {
    id: string;
}

@Component({
    components: {
        DetailsActionButtons,
        ListView,
        TabContainer,
    }
})
export default class AccountsDetails extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Getter(GETTER_ACCOUNT) private readonly getterAccount!: GetterAccount;
    @Inject() private readonly routingService!: RoutingService;
    private readonly currency = currencyFormatter();

    private accountDeposits: AccountDepositModel[] = [];
    private accountSecurities: AccountSecurityModel[] = [];
    private cash = 0;
    private depositTotal = 0;
    private readonly accountSecurityHeadings = ["Symbol", "Value", "Shares"];
    private readonly accountDepositHeadings = ["Date", "Amount"];
    private readonly tabs = ["Securities", "Deposits"];


    private id = 0;
    private name = "";

    public get value(){
        return this.accountSecurities.reduce((prev, cur) => prev + cur.value,0);
    }

    public get roi(){
        const roi = this.depositTotal === 0 ? 0: (this.profit/ this.depositTotal) * 100;
        return `${roi.toFixed(2)}`;
    }

    public get profit() {
        return this.value - (this.depositTotal - this.cash);
    }

    private created(){
        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        if(this.routingService.isPreviousRoute(Routes.Accounts) === false){
            this.pushRoute(this.routingService.createRoute(Routes.Accounts));
        }



        if(this.id <= 0){
            return;
        }
        this.load();
    }

    private load(){
        const account = this.getterAccount(this.id);
        this.name = account.name;
        this.accountDeposits = account.deposits;
        this.cash = account.cash;
        this.accountSecurities = account.securities;
        this.depositTotal = account.deposits
            .reduce((prev, cur) => prev + cur.amount, 0);
    }

    private handleClickAccountDeposit(deposit: AccountDepositModel) {
        this.routingService.navigateTo(Routes.AccountsDeposit, {
            query: { accountId: `${this.id}`,  id: `${deposit.id}` },
        });
    }

    private handleClickAccountSecurity(accountSecurity: AccountSecurityModel){
        this.routingService.navigateTo(Routes.AccountsSecurity, {
            query: { accountId: `${this.id}`, id: `${accountSecurity.id}` },
        });
    }

    private handleClickCreateAccountDeposit() {
        this.routingService.navigateTo(Routes.AccountsDeposit, {
            query: { accountId: `${this.id}`,  id: "0" },
        });
    }

    private handleClickCreateAccountSecurity(){
         this.routingService.navigateTo(Routes.AccountsSecurity, {
            query: { accountId: `${this.id}`, id: "0" },
        });
    }

    private renderDeposit(accountDeposit: AccountDepositModel){
        return (
            <div class="account-deposit">
                <span> {accountDeposit.date.toDateString()} </span>
                <span> {this.currency.format(accountDeposit.amount)}</span>
            </div>
        );
    }

    private renderSecurity(accountSecurity: AccountSecurityModel){
        return (
            <div class="account-security">
                <span>{ accountSecurity.security.symbol} </span>
                <span> { this.currency.format(accountSecurity.value)} </span>
                <span> { accountSecurity.shares} </span>

            </div>
        );
    }

    private save(){
        console.log("savetgffgfgf");
    }

}
</script>

<style lang="sass" scoped>

    .inputs
        padding: 0 0.25rem
        display: flex
        flex-direction: column
        align-items: stretch

        > label
            display: block
            text-align: left
        > input
            padding: 7px 3px
            margin: 5px 0 15px 0
            font-size: 14px


    .account-stats, .account-security, .account-deposit
        display: flex
        flex-wrap: wrap
        border: 1px solid #eee
        padding-top: 0.75rem

        > *
            flex: 1
            min-width: 150px
            width: 50%
            text-align: center
            margin-bottom: 0.75rem

    .list-item-heading
        font-weight: 600   
           


</style>