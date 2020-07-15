<template lang="pug">
div
    label
        span Account
        small
            a(href=""  v-on:click.prevent="toggleTransfer")
                span(v-if="!transfer") Transfer
                span(v-if="transfer") Cancel
    div.transfer-inputs
        div.transfer-from
            label(v-if="transfer") From
            div.input {{ accountName }}
        div.transfer-to
            label To
            select(
                v-model="accountId"
                v-on:change="change")
                option(
                    v-for="account in accounts"
                    v-bind:key="account.id"
                    v-bind:value="account.id"
                ) {{ account.name }}

</template>


<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { AccountModel, Getter, GetterAccount, GETTER_ACCOUNT, GETTER_ACCOUNTS } from '@/store';

@Component
export default class AccountTransfer extends Vue{
    @Getter(GETTER_ACCOUNT) private readonly getterAccount!: GetterAccount;
    @Getter(GETTER_ACCOUNTS) private readonly accounts!: AccountModel[];
    @Prop() private readonly id!: number;

    private accountId = 0;
    private accountName = "";
    private transfer = false;

    private created(){
        this.accountId = this.id;
        const account = this.getterAccount(this.accountId);
        this.accountName = account.name;
    }

    @Emit()
    private change(e: Event){
        e.preventDefault();
        return this.accountId;
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