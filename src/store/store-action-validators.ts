export enum StoreActions{
    None,
    Creating,
    Getting,
    Reading,
    Updating,
    Deleting,
}

type itemType = object | undefined;

interface IItem {
    error: string;
    message: string;
}

interface IStoreActionValidatorA{
    begin: () => IStoreActionValidatorB;
}

interface IStoreActionValidatorB{
    while: (action: StoreActions) => IStoreActionValidatorC;
}

interface IStoreActionValidatorC {
    throwIf: (item: itemType) => IStoreActionValidatorD
}

interface IStoreActionValidatorD {
    isUndefined: (message: string) => IStoreActionValidatorB;
}

export class StoreActionValidator implements IStoreActionValidatorA,
IStoreActionValidatorB, IStoreActionValidatorC, IStoreActionValidatorD {

    private _action = StoreActions.None;
    private _item: itemType | null = null;

    public begin = (): IStoreActionValidatorB =>{
        return this
    }
    public isUndefined = (message: string): IStoreActionValidatorB => {
        if(this._item === null){
            throw new Error("You must specify the item.");
        }

        const item: IItem = {
            error: "undefined",
            message,
        };

        if(typeof(this._item) === "undefined"){
            this.failureResponse(item);
        }

        return this;
    }

    public throwIf = (item: itemType): IStoreActionValidatorD => {
        this._item = item;
        this.failureResponse = this.throw;
        return this;
    }

    public while = (action: StoreActions):IStoreActionValidatorC => {
        this._action = action;
        return this;
    }

    private failureResponse: (item: IItem) => void = () => { return; };
    private failureMessage = (item: IItem) => {
        const action = StoreActions[this._action];
        return `Failed [${action}] ${item.message}. The result of the operation was <${item.error}>`;
    }

    private throw = (item: IItem) => {
        throw new Error(this.failureMessage(item));
    }
}