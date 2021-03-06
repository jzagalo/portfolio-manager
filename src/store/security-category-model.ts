import { SecuritySegmentModel } from "@/store/security-segment-model";
import { SecurityTerritoryModel } from "@/store/security-territory-model";
import { SecurityTypeModel } from "@/store/security-type-model";

export interface ISecurityCategoryModelConfig {
    id: number;
    color: string;
    segmentId: number;
    territoryId: number;
    typeId: number;
}

export class SecurityCategoryModel {
    private _id: number;
    private _segment: SecuritySegmentModel | null = null;
    private _segmentId: number;
    private _territory: SecurityTerritoryModel | null = null;
    private _territoryId: number;
    private _type: SecurityTypeModel | null = null;
    private _typeId: number;
    private _color: string;

    
    public get id() { return this._id;  }
    public set id(id: number) { 
        this._id = id;  
    }

    public get color() {
        return this._color;
    }

    public set color(color: string){
        this._color = color;
    }

    public get segment(){ return this._segment; }
    public get segmentId(){ return this._segmentId }
    public set segmentId(segmentId: number){ 
        this._segmentId = segmentId;
    }
    public get territory(){ return this._territory }
    public get territoryId(){ return this._territoryId }
    public set territoryId(territoryId: number){ 
         this._territoryId = territoryId; 
    }
    public get text() {
        const text = { text : "undefined"};
        const territory = (this.territory || text).text;
        const type = (this.type || text).text;
        const segment = (this.segment || text).text;
        return `${territory} ${type} ${segment}`; 
    }

    public get type(){  return this._type;  }
    public get typeId(){ return this._typeId;}
    public set typeId(typeId: number){
        this.typeId = typeId;
    }

    constructor(config: ISecurityCategoryModelConfig){
        this._id = config.id;
        this._color = config.color;
        this._segmentId = config.segmentId;
        this._territoryId = config.territoryId;
        this._typeId = config.typeId;
    }

    public setSegment = (segment: SecuritySegmentModel) => {
        this._segment = segment;
        return this;
    }

    public setTerritory = (territory: SecurityTerritoryModel) => {
        this._territory = territory;
        return this;
    }

    public setType = (type: SecurityTypeModel) => {
        this._type = type;
        return this;
    }

    public toPersistObj = (): ISecurityCategoryModelConfig => {
        return {
            id: this._id,
            color: this._color,
            segmentId: this._segmentId,
            territoryId: this._territoryId,
            typeId: this._typeId,
        };
    }

    public get abbreviation(){
        const text = {text: "undefined undefined"};
        const territory = (this.territory || text).text.charAt(0);
        const type = (this.type || text).text.charAt(0);
        const segment = (this.segment || text).text
            .split(" ")
            .reduce((prev,cur) => `${prev}${cur.charAt(0)}`, "");

            return `${territory}${type}${segment}`;
    }

}