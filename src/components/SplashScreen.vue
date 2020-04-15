<template lang="pug">
    AnimatableItem.splash-screen(
            v-bind:subject="animationSubject"
            v-bind:duration="'500ms'"
        )
        img(alt="Vue logo" src="../assets/logo.png")
        p Welcome to Your Vue.js + TypeScript App
        div SplashScreen
        button(v-on:click.prevent="click") Test
</template>

<script lang="ts">
import {Component, Vue, Prop } from 'vue-property-decorator';
import AnimatableItem from "./animations/AnimatableItem.vue";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import animationClasses from "@/components/animations/_animation-classes.scss";
import {AnimationTypes, AnimateOptions} from "@/components/animations/types";

@Component({
     components:{AnimatableItem},
})
export default class SplashScreen extends Vue {
    private readonly animationSubject = new Subject<AnimateOptions>();

    private beforeDestroy(){
        this.animationSubject.complete();
    }

    private mounted(){
        setTimeout(() => {
            this.animationSubject.next({type: AnimationTypes.FadeOut});
        }, 2000);
    }

    private click(){
        this.animationSubject.next({type: AnimationTypes.FadeOut});
    }
}

</script>

<style lang="sass" scoped>
   
.splash-screen
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10000
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    background-color: #fff

</style>