import { PortfolioCategoryModel} from "@/store/portfolio-category-model";

export interface IPortfolioPlanConfig {
    categories: PortfolioCategoryModel[];
    id: number;
    name: string;
}

export class PortfolioPlanModel {
    private _categories: PortfolioCategoryModel[];
    private _id: number;
    private _name: string;
   
    public get categories() {
        return this._categories;
    }
    
    public set categories(categories : PortfolioCategoryModel[]) {
        this._categories = categories;
    }
    
    public get id() {
        return this._id;
    }
    
    public set id(v : number) {
        this._id = v;
    }

    public get name() {
        return this._name;
    }
    
    public set name(v : string) {
        this._name = v;
    }
    
    constructor(config: IPortfolioPlanConfig) {
        this._categories = config.categories;
        this._id = config.id;
        this._name = config.name;
    }    
}