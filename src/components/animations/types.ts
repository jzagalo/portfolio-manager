export enum AnimationTypes {
    None,
    FadeIn,
    FadeOut
}

export interface AnimateOptions {
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
}