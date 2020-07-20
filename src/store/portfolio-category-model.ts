import { SecurityCategoryModel } from "@/store/security-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";

export interface IPortfolioCategoryModelConfig {
    categoryId: number;
    id: number;
    percent: number;
    planId: number;
}

export class PortfolioCategoryModel {
    private _category: SecurityCategoryModel | null = null;
    private _categoryId: number;
    private _id: number;
    private _percent: number;    
    private _portfolio: PortfolioPlanModel | null = null; 
    private _plan: PortfolioPlanModel | null = null;
    private _planId: number;    

    public get category() {
        if(this._category === null){
            throw new Error("This category has not been defined");
        }
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
    
    public get categoryId() {
        return this._categoryId;
    }

    public set categoryId(categoryId: number) {
        this._categoryId = categoryId;
    }    
    
    public get percent() {
        return this._percent;
    }

    public set percent(v : number) {
        this._percent = v;
    }    
    
    public get planId() {
        return this._planId;
    }

    public set planId(v : number) {
        this._planId = v;
    }
    
    public get plan() {
        if(this._plan === null){
            throw new Error("This plan has not been defined");
        }
        return this._plan;
    }
    
    public setPlan(plan : PortfolioPlanModel) {
        this._plan = plan;
    }    

    constructor(config: IPortfolioCategoryModelConfig){
        this._categoryId = config.categoryId;
        this._id = config.id;
        this._percent = config.percent;        
        this._planId = config.planId;
    } 

    public clone(){
        const model = new PortfolioCategoryModel({
            categoryId: this.categoryId,
            id: this.id,
            percent: this.percent,
            planId: this.planId,
        });

        if(this._category !== null){
            model.setCategory(this.category);
        }
        if(this._plan !== null){
            model.setPlan(this.plan);
        }

        return model;
    }   
}