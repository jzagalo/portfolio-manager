<template lang="pug">
div.router-view(v-bind:class="{ 'is-animating': isAnimating }")
    AnimatableItem.router-view-animatable(
        v-bind:complete="animationComplete"
        v-bind:subject="animationSubject")
        router-view/
</template>

<script lang="ts">
import {Vue, Component, Inject } from 'vue-property-decorator';
import { Routes, RoutingService, RouteEntry } from "@/components/routing";
import { AnimationTypes, AnimateOptions} from "@/components/animations/types";
import AnimatableItem from "@/components/animations/AnimatableItem.vue";
import { Subject } from "rxjs";

@Component({
    components: {
        AnimatableItem,
    }
})
export default class TheRouterOutlet extends Vue{
    @Inject() private readonly routingService!: RoutingService;
    private readonly animationSubject = new Subject<AnimateOptions>();
    private inAnimation = AnimationTypes.None;
    private isAnimatingIn = false;

    private get isAnimating(){
        return this.isAnimatingIn || this.isAnimatingOut;
    }

    private isAnimatingOut = false;
    private toEntry!: RouteEntry;

    private animate(route: Routes){
        this.isAnimatingOut = true;
        this.toEntry = this.routingService.find(route);
        this.animationSubject.next({ type: AnimationTypes.TranslateOutToLeft });
        const from = this.routingService.current;
        
        if (from.isChildOf(this.toEntry)) {
            console.log("to-from" +"TOTR");
            this.inAnimation = AnimationTypes.TranslateInFromLeft;
            this.animationSubject.next({ type: AnimationTypes.TranslateOutToRight });
        } else if (this.toEntry.isChildOf(from)) {
            console.log("to-from" +"TOTL");
            this.inAnimation = AnimationTypes.TranslateInFromRight;
            this.animationSubject.next({ type: AnimationTypes.TranslateOutToLeft });
        } else {
            console.log("Fade " +"TOTR");
            this.inAnimation = AnimationTypes.FadeIn;
            this.animationSubject.next({ type: AnimationTypes.FadeOut });
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
       this.animationSubject.next({ type: this.inAnimation });
       this.inAnimation = AnimationTypes.None; 

       /* if (this.isAnimatingOut === false) {
            return;
        }

        this.isAnimatingOut = false;
        this.$router.push(this.toEntry.path);
        this.animationSubject.next({ type: AnimationTypes.FadeIn });*/
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