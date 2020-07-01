<template lang="pug">
div.tab-container
   TabHeader(v-bind:tabs="tabs" v-on:click="setActive" )
   AnimatableItem(v-bind:subject="animationSubject")
     div(ref="container")
    
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TabEntry from './TabEntry.vue';
import TabHeader from './TabHeader.vue';
import { AnimationSubjectOptions, AnimationTypes }
from "@/components/animations/types";
import { AnimationSubject} from "@/components/animations/animation-subject";
import AnimatableItem from "@/components/animations/AnimatableItem.vue";
import { Refs } from "@/components/animations/types";

@Component({
    components: {
        AnimatableItem,
        TabHeader,
    }
})
export default class TabContainer extends Vue{
    @Prop() private readonly tabs!: string[];
    private readonly children: TabEntry[] = [];
    private activeIndex = 0;

    public $refs!: Refs<{
        container: HTMLElement,
    }>

    private readonly animationOptionsOut: AnimationSubjectOptions =  {
        complete: this.animationCompleteOut,
    };    

    private readonly animationSubject = new AnimationSubject();
    private inAnimation = AnimationTypes.None;   

    private animationCompleteOut(){
        this.children.forEach((x,i) => {
            x.visible = this.activeIndex === i;
        });

        requestAnimationFrame(() =>{
            this.animationSubject.next(this.inAnimation);
        });
    }   

    private mounted(){
        if(typeof(this.$slots) === "undefined" || typeof (this.$slots.default) === "undefined"){
            return;
        }        

        this.$slots.default.forEach((x, i) => {
            const entry = new TabEntry();
            entry.visible = (i === this.activeIndex);
            entry.$slots.default = [ x ];
            entry.$mount();

            this.$refs.container.appendChild(entry.$el);
            this.children.push(entry);
        });           
             
    }

    private setActive(index: number){
        let outAnimation = AnimationTypes.None;

        if(index > this.activeIndex){
            outAnimation = AnimationTypes.TranslateOutToLeft;
            this.inAnimation = AnimationTypes.TranslateInFromRight;
        } else if (index < this.activeIndex){
            outAnimation = AnimationTypes.TranslateOutToRight;
            this.inAnimation = AnimationTypes.TranslateInFromLeft;
        } else{
            return;
        }

        this.activeIndex = index;
        this.animationSubject.next(outAnimation, this.animationOptionsOut);
    }
}
</script>

<style lang="sass" scoped>
    .tab-container
        overflow: hidden
</style>