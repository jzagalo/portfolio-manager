<template lang="pug">
    div.buttons
        button.red(
            type="button"
            v-on:click.prevent="cancel"
        ) Cancel       
        button.green(
            type="submit"
            v-on:click.prevent="saveInternal"
        ) Save
</template>
<script lang="ts">
import {Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { RoutingService } from './routing';

@Component
export default class DetailsActionButtons extends Vue{
    @Inject() private readonly routingService!: RoutingService;
    @Prop() private readonly save!: () => void;

    private mounted(){
        console.log(this);
    }

    private cancel(){
        this.routingService.back();
    }

    private saveInternal(){
        this.save();
        this.routingService.back();
    }
}
</script>

<style lang="sass" scoped>
.buttons
    display: flex

    button
        flex: 1;

</style>