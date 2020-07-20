import { PortfolioCategoryModel } from "@/store/portfolio-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";
import { IPortfolioPlanModelState, IPortfolioCategoryModelState } from "@/store/portfolio-types";

import { initialState as securityCategoryInitialState } from "@/store/security-category-initial-state";

const categories: PortfolioCategoryModel[] = [];
const plans: PortfolioPlanModel[] = [];

if (process.env.NODE_ENV === "development") {
    const growth = new PortfolioPlanModel({ categories, id: 1, name: "Growth" });
    const value = new PortfolioPlanModel({ categories, id: 2, name: "Value" });    
    plans.push(growth);
    plans.push(value);

    const delc = securityCategoryInitialState.items.find((x) => x.id === 1)!;
    const demc = securityCategoryInitialState.items.find((x) => x.id === 2)!;
    const desc = securityCategoryInitialState.items.find((x) => x.id === 3)!;
    const iedm = securityCategoryInitialState.items.find((x) => x.id === 4)!;
    const ieem = securityCategoryInitialState.items.find((x) => x.id === 5)!;
    const dfdm = securityCategoryInitialState.items.find((x) => x.id === 6)!;
    const ifdm = securityCategoryInitialState.items.find((x) => x.id === 7)!;
    const dsdm = securityCategoryInitialState.items.find((x) => x.id === 8)!;

    const growthCatDelc = new PortfolioCategoryModel({ categoryId: delc.id, id: 1, percent: 38, planId: growth.id });
    const growthCatDemc = new PortfolioCategoryModel({ categoryId: demc.id, id: 2, percent: 12, planId: growth.id });
    const growthCatDesc = new PortfolioCategoryModel({ categoryId: desc.id, id: 3, percent: 6,  planId: growth.id });
    const growthCatIedm = new PortfolioCategoryModel({ categoryId: iedm.id, id: 4, percent: 18, planId: growth.id });
    const growthCatIeem = new PortfolioCategoryModel({ categoryId: ieem.id, id: 5, percent: 7,  planId: growth.id });
    const growthCatDfdm = new PortfolioCategoryModel({ categoryId: dfdm.id, id: 6, percent: 13, planId: growth.id });
    const growthCatIfdm = new PortfolioCategoryModel({ categoryId: ifdm.id, id: 7, percent: 3,  planId: growth.id });
    const growthCatDsdm = new PortfolioCategoryModel({ categoryId: dsdm.id, id: 8, percent: 3,  planId: growth.id });

    const valueCatDelc = new PortfolioCategoryModel({ categoryId: delc.id, id: 9, percent: 30, planId: value.id });
    const valueCatDemc = new PortfolioCategoryModel({ categoryId: demc.id, id: 10, percent: 8, planId: value.id });
    const valueCatDesc = new PortfolioCategoryModel({ categoryId: desc.id, id: 11, percent: 2, planId: value.id });
    const valueCatIedm = new PortfolioCategoryModel({ categoryId: iedm.id, id: 12, percent: 10, planId: value.id });
    const valueCatIeem = new PortfolioCategoryModel({ categoryId: ieem.id, id: 13, percent: 3, planId: value.id });
    const valueCatDfdm = new PortfolioCategoryModel({ categoryId: dfdm.id, id: 14, percent: 33, planId: value.id });
    const valueCatIfdm = new PortfolioCategoryModel({ categoryId: ifdm.id, id: 15, percent: 11, planId: value.id });
    const valueCatDsdm = new PortfolioCategoryModel({ categoryId: dsdm.id, id: 16, percent: 3, planId: value.id });

    categories.push(growthCatDelc);
    categories.push(growthCatDemc);
    categories.push(growthCatDesc);
    categories.push(growthCatIedm);
    categories.push(growthCatIeem);
    categories.push(growthCatDfdm);
    categories.push(growthCatIfdm);
    categories.push(growthCatDsdm);

    categories.push(valueCatDelc);
    categories.push(valueCatDemc);
    categories.push(valueCatDesc);
    categories.push(valueCatIedm);
    categories.push(valueCatIeem);
    categories.push(valueCatDfdm);
    categories.push(valueCatIfdm);
    categories.push(valueCatDsdm);
}

export const categoryState: IPortfolioCategoryModelState = {
    index: categories.length,
    items: categories,
};

export const planState: IPortfolioPlanModelState = {
    index: plans.length,
    items: plans,
};