<template lang="pug">
    div
        from
            div.inputs
                h1 Account Details
                label Name
                input(
                    type="text"
                    v-model="name"
                )
            DetailsActionButtons(v-bind:save="save")
</template>

<script lang="ts">
import DetailsActionButtons from "@/components/DetailsActionButtons.vue";
import { Vue, Component, Inject } from 'vue-property-decorator';
import { Routes, RoutingService } from "@/components/routing";
import { ACTION_PUSH_ROUTE, Action, ActionFn, GETTER_ACCOUNT, Getter,
    GetterAccount, PayloadPushRoute } from "@/store";

interface IQuery {
    id: string;
}

@Component({
    components: {
        DetailsActionButtons
    }
})
export default class AccountsDetails extends Vue {
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PayloadPushRoute>;
    @Getter(GETTER_ACCOUNT) private readonly getterAccount!: GetterAccount;
    @Inject() private readonly routingService!: RoutingService;

    private id = 0;
    private name = "";

    private created(){
        if(this.routingService.isPreviousRoute(Routes.Accounts) === false){
            this.pushRoute(this.routingService.createRoute(Routes.Accounts));
        }

        this.id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);

        if(this.id <= 0){
            return;
        }
        this.load();
    }

    private load(){
        const account = this.getterAccount(this.id);
        this.name = account.name;
    }

    private save(){
        console.log("save");
    }
    
}
</script>

<style lang="sass" scoped>
    .inputs
        padding: 0 0.25rem
</style>