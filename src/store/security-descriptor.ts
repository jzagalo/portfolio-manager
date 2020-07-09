export abstract class SecurityDescriptor {
    public get id(){ return this._id; }
    public set id(id: number){ 
        this._id = id; 
    }
    public get text(){ return this._text; }
    public set text(text: string){ 
        this._text = text; 
    }

    constructor(private _id: number, private _text: string) {

    }

    public toPersistObj = () => {
        return {
            id: this._id,
            text: this._text,
        }
    }
}