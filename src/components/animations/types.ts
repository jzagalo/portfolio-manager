import Vue from "vue";

export enum AnimationTypes {
    None,
    FadeIn,
    FadeOut,
    TranslateInFromLeft,
    TranslateInFromRight,
    TranslateOutToLeft,
    TranslateOutToRight,
}

export interface AnimationSubjectOptions{
    complete?: () => void;
}

export interface AnimateOptions extends AnimationSubjectOptions {
    type: AnimationTypes;
}

export enum AnimationStages {
    ActiveApplyPost,
    ActiveApplyPre,
    ActiveRemovePost,
    ActiveRemovePre,
    AfterApplyPost,
    AfterApplyPre,
    BeforeApplyPost,
    BeforeApplyPre,
    BeforeRemovePost,
    BeforeRemovePre,
    Complete,    
}

export type Props<T extends object> = Vue["$props"] & T;

export enum Routes {
    About,
    Home,
    Accounts,
    Securities,
}

export type Refs<T extends object> = Vue["$refs"] & T;