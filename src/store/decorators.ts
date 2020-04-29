import { createDecorator } from "vue-class-component";
import { mapState, Computed, ActionMethod, mapActions, mapGetters } from "vuex";
import { Dictionary } from "lodash";

type mapActionFnType = (map: Dictionary<string>) => Dictionary<ActionMethod>;
type mapComputedFnType = (map: Dictionary<string>) => Dictionary<Computed>;
type mapFnType = mapActionFnType | mapComputedFnType;
 
function createDecoratorFactory(optionsKey: "computed" | "methods", mapFn: mapFnType){
    return (storeKey: string) => {
        return createDecorator((componentOptions, key) => {
            const mapObject = { [key] : storeKey };            

            if(typeof(componentOptions[optionsKey]) === "undefined"){
                componentOptions[optionsKey] = {};
            }

            if(typeof(componentOptions[optionsKey]![key]) !== "undefined"){
                return;
            }
            componentOptions[optionsKey]![key] = mapFn(mapObject)[key];
        });
    };
}

export const Action = createDecoratorFactory("methods", mapActions);
export const State = createDecoratorFactory("computed", mapState);
export const Getter = createDecoratorFactory("computed", mapGetters);


