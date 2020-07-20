import { PortfolioCategoryModel } from "@/store/portfolio-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";
import { IPortfolioPlanModelState, IPortfolioCategoryModelState } from "@/store/portfolio-types";

import { initialState as securityCategoryInitialState } from "@/store/security-category-initial-state";

const categories: PortfolioCategoryModel[] = [];
const plans: PortfolioPlanModel[] = [];

if (process.env.NODE_ENV === "development") {
    const growth = new PortfolioPlanModel({ categories, id: 1, name: "Growth" });
    plans.push(growth);

    const delc = securityCategoryInitialState.items.find((x) => x.id === 1)!;
    const demc = securityCategoryInitialState.items.find((x) => x.id === 2)!;
    const desc = securityCategoryInitialState.items.find((x) => x.id === 3)!;
    const iedm = securityCategoryInitialState.items.find((x) => x.id === 4)!;
    const ieem = securityCategoryInitialState.items.find((x) => x.id === 5)!;
    const dfdm = securityCategoryInitialState.items.find((x) => x.id === 6)!;
    const ifdm = securityCategoryInitialState.items.find((x) => x.id === 7)!;
    const dsdm = securityCategoryInitialState.items.find((x) => x.id === 8)!;

    const catDelc = new PortfolioCategoryModel({ categoryId: delc.id, id: 1, percent: 38, planId: growth.id });
    const catDemc = new PortfolioCategoryModel({ categoryId: demc.id, id: 2, percent: 12, planId: growth.id });
    const catDesc = new PortfolioCategoryModel({ categoryId: desc.id, id: 3, percent: 6,  planId: growth.id });
    const catIedm = new PortfolioCategoryModel({ categoryId: iedm.id, id: 4, percent: 18, planId: growth.id });
    const catIeem = new PortfolioCategoryModel({ categoryId: ieem.id, id: 5, percent: 7,  planId: growth.id });
    const catDfdm = new PortfolioCategoryModel({ categoryId: dfdm.id, id: 6, percent: 13, planId: growth.id });
    const catIfdm = new PortfolioCategoryModel({ categoryId: ifdm.id, id: 7, percent: 3,  planId: growth.id });
    const catDsdm = new PortfolioCategoryModel({ categoryId: dsdm.id, id: 8, percent: 3,  planId: growth.id });

    categories.push(catDelc);
    categories.push(catDemc);
    categories.push(catDesc);
    categories.push(catIedm);
    categories.push(catIeem);
    categories.push(catDfdm);
    categories.push(catIfdm);
    categories.push(catDsdm);
}

export const categoryState: IPortfolioCategoryModelState = {
    index: 9,
    items: categories,
};

export const planState: IPortfolioPlanModelState = {
    index: 2,
    items: plans,
};