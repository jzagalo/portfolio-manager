import { STATE_PORTFOLIO_CATEGORIES, STATE_PORTFOLIO_PLANS,
        STATE_PORTFOLIO_CATEGORY, STATE_PORTFOLIO_PLAN,
        GETTER_PORTFOLIO_CATEGORIES, GETTER_PORTFOLIO_CATEGORY,
        GETTER_PORTFOLIO_PLANS, GETTER_PORTFOLIO_PLAN,
        } from "@/store/store-constants";

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

export type GetterPortfolioCategory = (id: number) => PortfolioCategoryModel;
export type GetterPortfolioCategories = (planId: number) => PortfolioCategoryModel[];
export type GetterPortfolioPlan = (id: number) => PortfolioPlanModel

export interface IPortfolioGetters {
    [GETTER_PORTFOLIO_CATEGORIES]: GetterPortfolioCategories;
    [GETTER_PORTFOLIO_CATEGORY]: GetterPortfolioCategory;
    [GETTER_PORTFOLIO_PLAN]: GetterPortfolioPlan;
    [GETTER_PORTFOLIO_PLANS]: PortfolioPlanModel[];
}