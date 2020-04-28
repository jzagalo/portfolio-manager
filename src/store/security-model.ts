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
    private _category: SecurityCategoryModel | null = null;
    private _categoryId: number;
    private _id: number;
    private _last: number;
    private _market: SecurityMarketModel | null = null;
    private _marketId: number;
    private _recommendation: SecurityRecommendations;
    private _symbol: string;

    public get category() { return this._category; }
    public get categoryId() { return this._categoryId; }
    public get id() { return this._id; }
    public get last() { return this._last; }
    public get market() { return this._market; }
    public get marketId() { return this._marketId; }
    public get recommendation() { return this._recommendation; }
    public get symbol() { return this._symbol; }

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