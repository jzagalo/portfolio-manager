<template lang="pug">
div.router-view(v-bind:class="{ 'is-animating': isAnimating }")
    AnimatableItem.router-view-animatable(        
        v-bind:subject="animationSubject")
        router-view/
</template>

<script lang="ts">
import {Vue, Component, Inject } from 'vue-property-decorator';
import { Routes, RoutingService, RouteEntry } from "@/components/routing";
import { AnimationTypes, AnimateOptions, AnimationSubjectOptions} from "@/components/animations/types";
import AnimatableItem from "@/components/animations/AnimatableItem.vue";
import { AnimationSubject } from "@/components/animations";

@Component({
    components: {
        AnimatableItem,
    }
})
export default class TheRouterOutlet extends Vue{
    @Inject() private readonly routingService!: RoutingService;
    private readonly animationSubject = new AnimationSubject();
    private inAnimation = AnimationTypes.None;
    private isAnimatingIn = false;
    private options: AnimateOptions = {type: AnimationTypes.None};

    private get isAnimating(){
        return this.isAnimatingIn || this.isAnimatingOut;
    }

    private readonly animationsOptionsIn: AnimationSubjectOptions = {
        complete: this.animationCompleteIn,
    };

    private readonly animationsOptionsOut: AnimationSubjectOptions = {
        complete: this.animationCompleteOut,
    };

    private isAnimatingOut = false;
    private toEntry!: RouteEntry;

    private animate(route: Routes){
        this.isAnimatingOut = true;
        this.toEntry = this.routingService.find(route);
        this.animationSubject.next(AnimationTypes.TranslateOutToLeft);
        const from = this.routingService.current;
        
        if (from.isChildOf(this.toEntry)) {
            console.log("to-from" +"TOTR");
            this.inAnimation = AnimationTypes.TranslateInFromLeft;
            this.animationSubject.next(AnimationTypes.TranslateOutToRight, this.animationsOptionsOut);
        } else if (this.toEntry.isChildOf(from)) {
            console.log("to-from" +"TOTL");
            this.inAnimation = AnimationTypes.TranslateInFromRight;
            this.animationSubject.next(AnimationTypes.TranslateOutToLeft, this.animationsOptionsOut);
        } else {
            console.log("Fade " +"TOTR");
            this.inAnimation = AnimationTypes.FadeIn;
            this.animationSubject.next(AnimationTypes.FadeOut, this.animationsOptionsOut);
        }
    }

    private animationComplete(){
         if(this.isAnimatingIn){
            this.isAnimatingIn = false;
        }
        
        this.isAnimatingIn = true;

        if(this.isAnimatingOut === false){
            return;
        }
       this.isAnimatingOut = false;
       this.$router.push(this.toEntry.path);
       console.log(this.inAnimation + " inA");
       this.animationSubject.next(this.inAnimation);
       this.inAnimation = AnimationTypes.None; 

       /* if (this.isAnimatingOut === false) {
            return;
        }

        this.isAnimatingOut = false;
        this.$router.push(this.toEntry.path);
        this.animationSubject.next({ type: AnimationTypes.FadeIn });*/
    }

     private animationCompleteOut() {
        this.isAnimatingOut = false;
        this.isAnimatingIn = true;
        this.$router.push(this.toEntry.path);
        this.animationSubject.next(this.inAnimation, this.animationsOptionsIn);
    }

    private animationCompleteIn() {
        this.isAnimatingIn = false;
        this.inAnimation = AnimationTypes.None;
    }

    private beforeDestroy(){
        this.animationSubject.complete();
        this.routingService.complete();
    }

    private created(){
        this.routingService
            .navigate$
            .subscribe(this.animate);
    }  

}
</script>

<style lang="sass" scoped>
    .router-view
        height: 100%
        &.is-animating
            overflow-x: hidden
    .router-view-animatable
        height: 100%
</style>