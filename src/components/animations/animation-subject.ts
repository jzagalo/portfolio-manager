import { Subject } from "rxjs";
import { AnimateOptions, AnimationSubjectOptions, AnimationTypes } from "@/components/animations/types";

export class AnimationSubject {

    private _subject = new Subject<AnimateOptions>();

    public get subject(){
        return this._subject;
    }

    public asObservable = () => {
        return this._subject.asObservable();
    };

    public complete = () => {
        this._subject.complete();
    }

    public next = (type: AnimationTypes, options?: AnimationSubjectOptions) => {
        if(typeof(options) !== "undefined") {            
             this._subject.next({ type, ...options });                   
        } else {
            this._subject.next({ type }); 
        }      
    };
}