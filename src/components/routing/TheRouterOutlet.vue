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
import { ACTION_PUSH_ROUTE, Action, ActionFn, PushRoutePayload, 
        ACTION_POP_ROUTE, PopRoutePayload } from "@/store";

@Component({
    components: {
        AnimatableItem,
    }
})
export default class TheRouterOutlet extends Vue{
    @Inject() private readonly routingService!: RoutingService;
    @Action(ACTION_PUSH_ROUTE) private readonly pushRoute!: ActionFn<PushRoutePayload>;
    @Action(ACTION_POP_ROUTE) private readonly popRoute!:  ActionFn<PopRoutePayload>;
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

    private animate(route: Routes, type: AnimationTypes){
        this.isAnimatingOut = true;
        this.toEntry = this.routingService.find(route);
        this.animationSubject.next(type, this.animationsOptionsOut);
    }

    private animateBack(route: Routes){
        this.inAnimation = AnimationTypes.TranslateInFromLeft;
        this.animate(route, AnimationTypes.TranslateOutToRight);
    }

    private animateForward(route: Routes){
        this.inAnimation = AnimationTypes.TranslateInFromRight;
        this.animate(route, AnimationTypes.TranslateOutToLeft);
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
       this.animationSubject.next(this.inAnimation);
       this.inAnimation = AnimationTypes.None; 
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
            .subscribe(this.navigateForward);

        this.routingService
            .navigateBack$
            .subscribe(this.navigateBack);
    }  

    private navigateBack(route: Routes){
        this.animateBack(route);
        this.popRoute();
    }

    private navigateForward(route: Routes){
        this.pushRoute(this.routingService.current.route);
        this.animateForward(route);
    }

}
</script>

<style lang="sass" scoped>
    .router-view
        display: flex
        flex-direction: column
        height: 100%
        &.is-animating
            overflow-x: hidden
    .router-view-animatable
        flex: 1
        
</style>