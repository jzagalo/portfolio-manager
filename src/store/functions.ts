interface IStateItem {
    id: number;
}

interface IState<T extends IStateItem> {
    index: number;
    items: T[];
}

export function findAll<T extends IStateItem>(state: IState<T>){
    return state.items;
}

export function findById<T extends IStateItem>(state: IState<T>, id: number){
    return state.items.find((x) => x.id === id);
}

export function undefinedMessage(entityName: string, id: number, stateIndex: number){
    return id < stateIndex ?    `${entityName} with id ${id}` :
         `${entityName} with id ${id}. The id is greater than or equal to the
         state index of ${stateIndex}`;
}

export function add<T extends IStateItem>(state: IState<T>, item: T, func: (item: T) => string){
    if(typeof item === "undefined"){
        throw new Error(`Cannot add 'undefined' item to the store`);
    } 

    if(item === null){
        throw new Error(`Cannot add 'null' item to the store`);
    }

    item.id = state.index;
    state.items = sort([...state.items, item], func);
    console.log(state.items);
    console.log("divider");
    console.log(item);
    state.index += 1;
}

export function sort<T>(items: T[], func: (item: T) => string){
    return items.sort((a,b) =>{
        const aStr = func(a).toUpperCase();
        const bStr = func(b).toUpperCase();
        if(aStr < bStr) return -1;
        if(aStr > bStr) return 1;
        return 0;
    });
}