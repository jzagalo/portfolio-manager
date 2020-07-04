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

