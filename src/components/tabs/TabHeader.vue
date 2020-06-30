<template lang="pug">
    ul.tab-headings
        li(v-for="(tab, index) in tabs" v-bind:key="tab")
            a(href="#void" v-bind:class="{ 'active': index === activePosition}"  v-on:click.prevent="click(index)") {{tab}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TabHeader extends  Vue{
    @Prop() private readonly tabs!: string[];
    @Prop({ default: 0 }) private readonly activePos!: number;

    private activePosInternal = -1;

    private get activePosition(){
        return this.activePosInternal !== -1 ?
            this.activePosInternal : this.activePos;
    }

    private click(index: number){
        this.activePosInternal = index;
        this.$emit("click", index);
    }    
}
</script>
<style lang="sass" scoped>
    .tab-headings
        display: flex
        flex-wrap: wrap
        border-top: 1px solid #eee
        border-left: 1px solid #eee
        border-bottom: 1px solid #eee
        list-style: none

        li
            flex: 1;
            text-align: center
        
        a
            display: block;
            padding: 0.75rem 0.5rem
            text-decoration: none
            border-right: 1px solid transparent
            color: #222
    .tab-headings
    
        a
        
            &.active
                background-color: #e0e8ff
                font-weight: 600
                color: #525f6c
</style>