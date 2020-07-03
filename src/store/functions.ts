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