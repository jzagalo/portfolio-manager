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

@Component
export default class AnimatableItem extends Vue {
    @Prop() private readonly subject!: Subject<string>;
    @Prop({ default: "200ms"}) private readonly duration!: string;

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

     private animate(animation: string): void{
        this.beforeCssClass = "fade-out-before";
        requestAnimationFrame(() => {
            this.activeCssClass = "fade-out-active";
            requestAnimationFrame(() => {
                this.beforeCssClass = "";
            });
        });
    }

    private animationEnd(){
        this.afterCssClass = "fade-out-after";
        requestAnimationFrame(() => {
            this.activeCssClass = "";
        });
    }
}
</script>