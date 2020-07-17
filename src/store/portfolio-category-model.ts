import { SecurityCategoryModel } from "@/store/security-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";

export interface IPortfolioCategoryModelConfig {
    categoryId: number;
    id: number;
    percent: number;
    portfolioId: number;
}

export class PortfolioCategoryModel {
    private _category: SecurityCategoryModel | null = null;
    private _categoryId: number;
    private _id: number;
    private _percent: number;
    private _portfolioId: number; 
    private _portfolio: PortfolioPlanModel | null = null; 
    
    public get category() {
        return this._category;
    }

    public setCategory(v : SecurityCategoryModel) {
        this._category = v;
    }    
    
    public get id() {
        return this._id;
    }

    public set id(v : number) {
        this._id = v;
    }    
    
    public get percent() {
        return this._percent;
    }

    public set percent(v : number) {
        this._percent = v;
    }    
    
    public get portfolioId() {
        return this._portfolioId;
    }

    public set portfolioId(v : number) {
        this._portfolioId = v;
    }
    
    public get portfolio() {
        return this._portfolio;
    }
    
    public setPortfolio(v : PortfolioPlanModel) {
        this._portfolio = v;
    }    

    constructor(config: IPortfolioCategoryModelConfig){
        this._categoryId = config.categoryId;
        this._id = config.id;
        this._percent = config.percent;
        this._portfolioId = config.portfolioId;
    }    
}