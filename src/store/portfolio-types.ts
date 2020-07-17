import { STATE_PORTFOLIO_CATEGORIES, STATE_PORTFOLIO_PLANS } from "@/store/store-constants";

import { PortfolioCategoryModel } from "@/store/portfolio-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";

export interface IPortfolioCategoryModelState {
    index: number;
    items: PortfolioCategoryModel[];
}

export interface IPortfolioPlanModelState {
    index: number;
    items: PortfolioPlanModel[];
}

export interface IPortfolioState {
    [STATE_PORTFOLIO_CATEGORIES]: IPortfolioCategoryModelState;
    [STATE_PORTFOLIO_PLANS]: IPortfolioPlanModelState;
}