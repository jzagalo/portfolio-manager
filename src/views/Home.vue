<template lang="pug">
  div.home
      select(v-model="selectedPlan")
          option(
            v-for="plan in plans"
            v-bind:key="plan.id"
            v-bind:value="plan"
          ) {{ plan.name }}
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
                li(
                    v-for="acctSecurity in acctSecurityArray[1]"
                    v-bind:key="acctSecurity.id")
                    div.row
                        div {{ acctSecurity.security.symbol }}
                        div {{ acctSecurity.account.name }}
                        div {{ acctSecurity.shares }}
                        div {{ currency.format(accountSecurity.security.last)}}
        
</template>

<script lang="ts">

import { Vue, Component, Inject } from "vue-property-decorator";
import { Routes, RoutingService } from "@/components/routing";
import { currencyFormatter } from "@/store/functions";
import {
  AccountModel, AccountSecurityModel, GETTER_ACCOUNTS,
  GETTER_PORTFOLIO_PLANS, Getter, PortfolioPlanModel, } from "@/store";
import HelloWorld from "@/components/HelloWorld.vue";
import MainNavButton from "@/components/main-nav/MainNavButton.vue";

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
        });
      });

      Object.keys(groups).forEach((x) => this.accountSecurities.push([x, groups[x]]));
    }


 
}
</script>

<style lang="sass" scoped>
.home
  height: 2000px

.row
    display: flex
    align-items: center

    & > *
        flex: 1
</style>

