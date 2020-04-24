<template lang="pug">
    div.accounts-container 
        h1 Accounts 
        form
            div.add
                input(
                    ref="add"
                    type="text"
                    required=""
                    placeholder="Name"
                    v-model="name"
                )
                button(
                    type="submit"
                    @click="add")
                    FontAwesomeIcon(icon="plus")
        div.headings
            label Name
        div.accounts(v-for="account in accountState.items" )
            div.name {{ account.name }}
            button.remove(v-on:click.prevent="remove(account.id)")
                FontAwesomeIcon(icon="times")
       
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IAccountState, State, Action, ActionFn, STATE_ACCOUNTS,
        ACTION_ADD_ACCOUNT, AddAccountPayload,
        RemoveAccountPayload, ACTION_REMOVE_ACCOUNT } from '../store';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Refs } from "@/components/animations/types";

@Component
export default class Accounts extends Vue {
    @State(STATE_ACCOUNTS) private accountState!: IAccountState;
   
    public $refs!: Refs<{
        add: HTMLInputElement;
    }>

    @Action(ACTION_ADD_ACCOUNT) private addAccount!: ActionFn<AddAccountPayload>;
    @Action(ACTION_REMOVE_ACCOUNT) private removeAccount!: ActionFn<RemoveAccountPayload>;

    private name = "";

    private add(){
        if(this.name === ""){
            return;
        }
        this.addAccount(this.name);
        this.name = "";
        this.$refs.add.focus();
    }

    private remove(id: number){
       this.removeAccount(id);
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