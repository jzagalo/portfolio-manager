<template lang="pug">
div.settings-container
    button.cog(v-on:click.prevent="toggle")
        FontAwesomeIcon(icon="cog")/
    AnimatableItem.settings(v-bind:subject="subject" v-show="isVisible")    
        a(v-on:click.prevent="navigateToAbout" href="#void") About              
</template>

<script lang="ts">

import { Vue, Component, Inject } from 'vue-property-decorator';
import  AnimatableItem from '../animations/AnimatableItem.vue';
import { AnimationSubject } from "@/components/animations";
import { Routes, RoutingService, AnimationTypes, AnimationSubjectOptions } from "@/components/routing";


@Component({
    components: {
        AnimatableItem
    }
})
export default class TheAppBarSettings extends Vue {
    @Inject() private readonly routingService!: RoutingService;
    private isVisible = false;

    private readonly animationOptionsClose: AnimationSubjectOptions = {
        complete: this.closed,
    }

    private close(){
        if(this.isVisible === false)
            return;
        this.subject.next(AnimationTypes.TranslateOutToRight, this.animationOptionsClose);
    }

    private closed(){
        this.isVisible = false;
    }

    private created(){
        this.routingService
            .navigate$
            .subscribe(this.close);
    }

    private open(){
        if(this.isVisible){
            return;
        }
        this.isVisible = true;
        requestAnimationFrame(() => {
            this.subject.next(AnimationTypes.TranslateInFromRight);
        });
    }
    private readonly subject = new AnimationSubject();

    private navigateToAbout(){
        this.routingService.navigateTo(Routes.About);
    }    

    private toggle(){
        switch(this.isVisible){
            case true:
                this.subject.next(AnimationTypes.TranslateOutToRight);
                this.isVisible = false;
                break;
            case false:
                this.isVisible = true;
                this.subject.next(AnimationTypes.TranslateInFromRight)
                break;
        }
    }
    
}
</script>

<style lang="sass" scoped>
.settings-container
    position: relative

.cog
    flex: 0
    padding: 0.75rem 1rem
    min-height: 2.83rem
    background: #5848b4
    border: 0
    color: #fff

.settings
    position: absolute;
    top: 100% 
    background-color: #fff
    transform: translateX(100%)

    & > a
        display: block
        padding: 1rem 0.2rem
</style>