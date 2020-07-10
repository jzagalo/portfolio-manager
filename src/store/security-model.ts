import { SecurityCategoryModel } from "@/store/security-category-model";
import { SecurityMarketModel } from "@/store/security-market-model";
import { SecurityRecommendations } from "@/store/security-types";

export interface ISecurityModelConfig {
    categoryId: number;
    id: number;
    last: number;
    marketId: number;
    recommendation: SecurityRecommendations;
    symbol: string;
}

export class SecurityModel {
    public _category: SecurityCategoryModel | null = null;
    public _categoryId: number;
    public _id: number;
    public _last: number;
    public _market: SecurityMarketModel | null = null;
    public _marketId: number;
    public _recommendation: SecurityRecommendations;
    public _symbol: string;

    public get category() { return this._category; }
    public set categoryId(categoryId: number){
        this._categoryId = categoryId;
    }
    public get categoryId() { return this._categoryId; }
    public get id() { return this._id; }
    public set id(id: number) { this._id = id; }
    public get last() { return this._last; }
    public set last(last: number) { this._last = last; }
    public get market() { return this._market; }
    public get marketId() { return this._marketId; }
    public set marketId(marketId:number) { 
        this._marketId = marketId; 
    }    
    public get recommendation() { return this._recommendation; }
    public set recommendation(recom:SecurityRecommendations) { 
        this._recommendation = recom;
    }
    public get symbol() { return this._symbol; }
    public set symbol(symbol: string) { 
         this._symbol = symbol;
    }

    constructor(config: ISecurityModelConfig) {
        this._categoryId     = config.categoryId;
        this._id             = config.id;
        this._last           = config.last;
        this._marketId       = config.marketId;
        this._recommendation = config.recommendation;
        this._symbol         = config.symbol;
    }

    public setCategory = (category: SecurityCategoryModel) => {
        this._category = category;
        return this;
    }

    public setMarket = (market: SecurityMarketModel) => {
        this._market = market;
        return this;
    }

    public toPersistObj = (): ISecurityModelConfig => {
        return {
            categoryId: this._categoryId,
            id: this._id,
            last: this._last,
            marketId: this._marketId,
            recommendation: this._recommendation,
            symbol: this._symbol,
        };
    }
}