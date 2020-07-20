import { STATE_PORTFOLIO_CATEGORIES, STATE_PORTFOLIO_PLANS,
         GETTER_PORTFOLIO_PLAN, GETTER_PORTFOLIO_PLANS,
         GETTER_SECURITY_CATEGORY, GETTER_PORTFOLIO_CATEGORIES,
         GETTER_PORTFOLIO_CATEGORY, GETTER_SECURITY_CATEGORIES,
        } 
     from "@/store/store-constants";
import { categoryState, planState } from "@/store/portfolio-initial-state";
import { IPortfolioState, IPortfolioGetters } from "@/store/portfolio-types";
import { findById, undefinedMessage } from "@/store/functions";
import { StoreActions, StoreActionValidator } from "@/store/store-action-validators";
import { IStoreGetters, StoreGetterTree } from "@/store/store-types";
import { PortfolioCategoryModel } from "@/store/portfolio-category-model";

const storeActionValidator = new StoreActionValidator();

export const portfolioState: IPortfolioState = {
    [STATE_PORTFOLIO_CATEGORIES]: categoryState,
    [STATE_PORTFOLIO_PLANS]:  planState,
}

export const portfolioGetters: StoreGetterTree = {
    [GETTER_PORTFOLIO_CATEGORIES]: (storeState, getters: IStoreGetters) => {
        return (planId: number) =>  {
            if(planId <= 0) {
                return getters[GETTER_SECURITY_CATEGORIES].map((x) => {
                    const portfolioCategory = new PortfolioCategoryModel({
                        categoryId: x.id,
                        id: x.id,
                        percent: 0,
                        planId: 0,
                    });

                    portfolioCategory.setCategory(x);
                    return portfolioCategory;
                });                
            }
           
            return storeState[STATE_PORTFOLIO_CATEGORIES].items
                  .filter((x) => x.planId === planId)
                  .map((x) => getters[GETTER_PORTFOLIO_CATEGORY](x.id));
        };
    },
    [GETTER_PORTFOLIO_CATEGORY]: (storeState, getters: IStoreGetters) => {
        return (id: number) => {
            const state = storeState[STATE_PORTFOLIO_CATEGORIES];
            const portfolioCategory = findById(state, id)!;

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(portfolioCategory)
                .isUndefined(undefinedMessage("portfolio category", id, state.index));

            const securityCategory = getters[GETTER_SECURITY_CATEGORY](portfolioCategory.categoryId);
            portfolioCategory.setCategory(securityCategory);

            return portfolioCategory;
        };
    },
    [GETTER_PORTFOLIO_PLAN]: (storeState, getters: IPortfolioGetters) => {
        return (id: number) =>  {
            const state = storeState[STATE_PORTFOLIO_PLANS];
            const plan = findById(state, id)!;

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(plan)
                .isUndefined(undefinedMessage("portfolio plan", id, state.index));

            plan.categories = getters[GETTER_PORTFOLIO_CATEGORIES](plan.id);

            return plan;
        };
    },
    [GETTER_PORTFOLIO_PLANS]: (storeState, getters: IPortfolioGetters) => {
        return storeState[STATE_PORTFOLIO_PLANS].items.map((x) => getters[GETTER_PORTFOLIO_PLAN](x.id));
    }
}