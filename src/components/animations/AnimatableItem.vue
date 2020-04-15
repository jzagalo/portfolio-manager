<template lang="pug">
    div.animatable(
        v-bind:class="cssClass"
        v-bind:style="{ animationDuration: duration }"
        v-on:animationend.prevent="animationEnd" )
        slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import animationClasses from "@/components/animations/_animation-classes.scss";
import {AnimationTypes, AnimateOptions} from "@/components/animations/types";

@Component
export default class AnimatableItem extends Vue {
    @Prop() private readonly subject!: Subject<AnimateOptions>;
    @Prop({ default: "200ms"}) private readonly duration!: string;

    private readonly animationMap = new Map<AnimationTypes, string>([
        [AnimationTypes.FadeIn, animationClasses["fadeIn"]],
        [AnimationTypes.FadeOut, animationClasses["fadeOut"]]
    ]);

    private type = AnimationTypes.None

    private activeCssClass = "";
    private afterCssClass = "";
    private beforeCssClass = "";
    private readonly unsubscribe = new Subject<void>();

    private get cssClass(){
        return `${this.beforeCssClass} ${this.activeCssClass} ${this.afterCssClass}`
    }

    private beforeDestroy(){
        console.log("destroyed");
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private created(){
        this.subject
                .asObservable()
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(this.animate);
    }

     private animate(options: AnimateOptions): void{
        this.type = options.type;
        const animation = this.animationMap.get(this.type); 

        this.afterCssClass = "";
        this.beforeCssClass = this.getCssClass(`${animation}Before`);
        requestAnimationFrame(() => {
            this.activeCssClass = this.getCssClass(`${animation}Active`);
            requestAnimationFrame(() => {
                this.beforeCssClass = "";
            });
        });
    }

    private animationEnd(){
        const animation = this.animationMap.get(this.type);
        this.afterCssClass = this.getCssClass(`${animation}After`);
        requestAnimationFrame(() => {
            this.activeCssClass = "";
        });

        this.type = AnimationTypes.None;
    }

    private getCssClass(index: string){
        const css = animationClasses[index];
        if(typeof(css) === "undefined"){
            console.warn(`CSS animation class for ${index} is undefined`);
            return "";
        }

        return css;
    }
}
</script>