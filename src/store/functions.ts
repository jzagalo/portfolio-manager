interface IStateItem {
    id: number;
}

interface IState<T extends IStateItem> {
    index: number;
    items: T[];
}

interface ISortOptions {
    descending?: boolean;
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

export function add<T extends IStateItem>(state: IState<T>, item: T, func: (item: T) => string | number, options?: ISortOptions,){
    if(typeof item === "undefined"){
        throw new Error(`Cannot add 'undefined' item to the store`);
    } 

    if(item === null){
        throw new Error(`Cannot add 'null' item to the store`);
    }

    item.id = state.index;
    state.items = sort([...state.items, item], func, options);
    state.index += 1;
}

function sortAscending(a: string | number, b: string | number) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

function sortDescending(a: string | number, b: string | number) {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
}

export function sort<T>(items: T[], func: (item: T) => string | number, options?: ISortOptions) {
    return items.sort((a, b) => {
        const funcA = func(a);
        const funcB = func(b);
        let valueA: string | number;
        let valueB: string | number;
        if (typeof funcA === "string" && typeof funcB === "string") {
            valueA = funcA.toUpperCase();
            valueB = funcB.toUpperCase();
        } else if (
            (typeof funcA === "number" && typeof funcB === "number") ||
            (typeof funcA === "bigint" && typeof funcB === "bigint")
        ) {
            valueA = funcA;
            valueB = funcB;
        } else {
            throw new Error(
                "The result of calling the provided function must be to convert items into string or numbers.",
            );
        }
        if (
            typeof options === "undefined" ||
            typeof options.descending === "undefined" ||
            options.descending === false
        ) {
            return sortAscending(valueA, valueB);
        } else {
            return sortDescending(valueA, valueB);
        }
    });
}

export function remove<T extends IStateItem>(state: IState<T>, id: number){
    state.items = state.items.filter((x) => x.id !== id);
}

export function currencyFormatter(
    minimumFractionDigits: number = 2,
    maximumFractionDigits: number = 2
){
    return new Intl.NumberFormat("en-US",{
        currency: "USD",
        maximumFractionDigits,
        minimumFractionDigits,
        style: "currency",
    })
}