<template lang="pug">
    div(v-if="isVisible")
        slot
</template>

<script lang="ts">
import {Vue, Component } from 'vue-property-decorator';
export default class TabEntry extends Vue{
    private isVisible = true;

    public get visible(){
        return this.isVisible;
    }

    public set visible(isVisible: boolean){
        this.isVisible = isVisible;
    }
}
</script>