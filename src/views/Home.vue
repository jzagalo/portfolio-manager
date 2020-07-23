<template lang="pug">
  div.home
      select(v-model="selectedPlan")
          option(
            v-for="plan in plans"
            v-bind:key="plan.id"
            v-bind:value="plan"
          ) {{ plan.name }}
      div(v-if="selectedPlan")
        ul
          li.row
            label Category
            label Plan
            label Actual
            label Difference
          li.row(v-for="portfolioCategory in selectedPlan.categories")
              div.color(v-bind:style="{ 'background-color': portfolioCategory.category.color}")
              div {{ portfolioCategory.category.abbreviation }}
              div {{ portfolioCategory.percent.toFixed(1) }}
              div {{ categoryPercent(portfolioCategory).toFixed(1) }}
              div {{ (categoryPercent(portfolioCategory) - portfolioCategory.percent).toFixed(1) }}
      ul.account-securities
        li.row
            label Symbol
            label Account
            label Shares
            label Last
        li(
          v-for="acctSecurityArray in accountSecurities"
          v-bind:key="acctSecurityArray[0]")
            ul
              li( v-for="acctSecurity in acctSecurityArray[1]"
                  v-bind:key="acctSecurity.id"
                  v-bind:style="{'background-color': acctSecurity.security.category.color}")
                  div.row
                    div {{ acctSecurity.security.symbol }}
                    div {{ acctSecurity.account.name }}
                    div {{ acctSecurity.shares }}
                    div {{ currency.format(acctSecurity.security.last)}}
                  div.row.btns
                    button.btn(v-on:click.prevent="(e) => decrease(e, acctSecurity)") -
                    button.btn(v-on:click.prevent="(e) => increase(e, acctSecurity)") +
</template>

<script lang="ts">

import { Vue, Component, Inject } from "vue-property-decorator";
import { Routes, RoutingService } from "@/components/routing";
import { currencyFormatter, sort } from "@/store/functions";
import {
  AccountModel, AccountSecurityModel, GETTER_ACCOUNTS,
  GETTER_PORTFOLIO_PLANS, Getter, PortfolioPlanModel, PortfolioCategoryModel } from "@/store";
import HelloWorld from "@/components/HelloWorld.vue";
import MainNavButton from "@/components/main-nav/MainNavButton.vue";

type AccountSecurityKeyArray =[ string, AccountSecurityModel[]];

@Component({
  components: {
    HelloWorld,
    MainNavButton
  }
})

export default class Home extends Vue {
  @Getter(GETTER_ACCOUNTS) private readonly accounts!: AccountModel[];
  @Getter(GETTER_PORTFOLIO_PLANS) private readonly plans!: PortfolioPlanModel[];

  private readonly currency = currencyFormatter();
  private accountSecurities: Array<[string, AccountSecurityModel[]]> = [];
  private selectedPlan: PortfolioPlanModel | null = null;
  private activeKey = "";

  private mouseOverAccountSecurities(array: AccountSecurityKeyArray){
    if(this.activeKey === array[0]){
      return;
    }
    this.activeKey = array[0];
  }

  private mouseLeaveAccountSecurities(){
    this.activeKey = "";
  }

  private decrease(e: MouseEvent, accountSecurity: AccountSecurityModel){
    e.preventDefault();

    if(e.getModifierState("Shift")){
      accountSecurity.shares -= 5;  
    } else if (e.getModifierState("Control")){
      accountSecurity.shares -= 10;
    } else if (e.getModifierState("Alt")) {
      accountSecurity.shares -= 20;
    } else {
      accountSecurity.shares -= 1;
    }
    
  }    

  private increase(e: MouseEvent, accountSecurity: AccountSecurityModel){
    e.preventDefault();
    if(e.getModifierState("Shift")){
      accountSecurity.shares += 5;  
    } else if (e.getModifierState("Control")){
      accountSecurity.shares += 10;
    } else if (e.getModifierState("Alt")) {
      accountSecurity.shares += 20;
    } else {
      accountSecurity.shares += 1;
    }
  }

  private mounted() {
    if(this.plans.length > 0){
      this.selectedPlan = this.plans[0];
    }

    if(this.selectedPlan === null){
      return;
    }

    const groups: {[key: string]: AccountSecurityModel[]} = {};
    this.selectedPlan.categories.forEach((x) => {
      this.accounts.forEach((y) => {
          const filteredSecurities = y.securities.
          filter((z) => z.security.categoryId === x.categoryId)
          .map((z) => {
              const accountSecurity = new AccountSecurityModel({
                accountId: z.accountId,
                id: z.id,
                security: z.security,
                securityId: z.securityId,
                shares: z.shares,
              });
              accountSecurity.account = y;
              return accountSecurity;
          });
          
          if(groups[x.category.abbreviation]){
                groups[x.category.abbreviation].push(...filteredSecurities);
          }else {
            groups[x.category!.abbreviation] = filteredSecurities;
          }
          groups[x.category.abbreviation] = sort(groups[x.category.abbreviation], (x) => x.security.symbol);
      });
    });

    Object.keys(groups).forEach((x) => this.accountSecurities.push([x, groups[x]]));
  }

  private get totalValue(){
    return this.accountSecurities.reduce(
      (pre, cur) => pre + cur[1].reduce((pre1, cur1) => pre1 + cur1.value, 0),0 )
  }

  private categoryPercent(portfolioCategory: PortfolioCategoryModel){
    return (this.categoryValue(portfolioCategory.category.abbreviation)/this.totalValue) * 100; 
  }

  private categoryValue(category: string){
    return this.accountSecurities
          .filter((x) => x[0] === category)
          .map((x) => x[1])
          .reduce((pre, cur) => pre + cur.reduce((pre1, cur1) => pre1 + cur1.value,0),0);
  }
 
}
</script>

<style lang="sass" scoped>
.home
  height: 100
  display: grid
  padding: 0.25rem
  grid-template-rows: auto 1fr

.account-securities
  overflow: auto

.color
  height: 1.5rem
  max-width: 0.75rem
  margin-right: 0.25rem

.btns
  margin-bottom: 0.125rem

.btn
  padding: 0.75rem
  min-width: 2.5rem

  &:first-child
    margin-right: 0.125rem

.row
    display: flex
    align-items: center

    & > *
        flex: 1
</style>

