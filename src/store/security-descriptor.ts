export abstract class SecurityDescriptor {
    public get id(){ return this._id; }
    public get text(){ return this._text; }
    public set text(text: string){ 
        this._text = text; 
    }

    constructor(private readonly _id: number, private _text: string) {

    }

    public toPersistObj = () => {
        return {
            id: this._id,
            text: this._text,
        }
    }
}