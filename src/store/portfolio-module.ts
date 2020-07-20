import { 
        ACTION_ADD_PORTFOLIO_PLAN, ACTION_UPDATE_PORTFOLIO_PLAN,
        MUTATION_UPDATE_PORTFOLIO_PLAN, MUTATION_ADD_PORTFOLIO_PLAN,
        STATE_PORTFOLIO_CATEGORIES, STATE_PORTFOLIO_PLANS,
         GETTER_PORTFOLIO_PLAN, GETTER_PORTFOLIO_PLANS,
         GETTER_SECURITY_CATEGORY, GETTER_PORTFOLIO_CATEGORIES,
         GETTER_PORTFOLIO_CATEGORY, GETTER_SECURITY_CATEGORIES,
        } 
     from "@/store/store-constants";
import { categoryState, planState } from "@/store/portfolio-initial-state";
import { IPortfolioState, IPortfolioGetters,PayloadAddPortfolioPlan,PayloadUpdatePortfolioPlan } from "@/store/portfolio-types";
import { findById, undefinedMessage, add } from "@/store/functions";
import { StoreActions, StoreActionValidator } from "@/store/store-action-validators";
import { IStoreGetters, StoreGetterTree, StoreActionTree, StoreMutationTree } from "@/store/store-types";
import { PortfolioCategoryModel } from "@/store/portfolio-category-model";
import { PortfolioPlanModel } from "@/store/portfolio-plan-model";

const storeActionValidator = new StoreActionValidator();

export const portfolioState: IPortfolioState = {
    [STATE_PORTFOLIO_CATEGORIES]: categoryState,
    [STATE_PORTFOLIO_PLANS]:  planState,
}

function totalPercent(plan: PortfolioPlanModel){
    const total = plan.categories.reduce((pre, cur) => pre + cur.percent, 0);
    if(total !== 100){
        console.log("The total percent of the plan must be 100% but the current percent os `${total}%`");
        return true;
    }

    return false;
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

            return portfolioCategory.clone();
        };
    },
    [GETTER_PORTFOLIO_PLAN]: (storeState, getters: IStoreGetters) => {
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
    [GETTER_PORTFOLIO_PLANS]: (storeState, getters: IStoreGetters) => {
        return storeState[STATE_PORTFOLIO_PLANS].items.map((x) => getters[GETTER_PORTFOLIO_PLAN](x.id));
    }
}

export const portfolioActions: StoreActionTree = {
    [ACTION_ADD_PORTFOLIO_PLAN](this, { commit}, payload: PayloadAddPortfolioPlan){
        if(totalPercent(payload)){
            return;
        }
        commit(MUTATION_ADD_PORTFOLIO_PLAN, payload);
    },
    [ACTION_UPDATE_PORTFOLIO_PLAN](this, { commit }, payload: PayloadUpdatePortfolioPlan){
       if(totalPercent(payload)){
            return;
        }
        commit(MUTATION_UPDATE_PORTFOLIO_PLAN, payload); 
    }
}

export const portfolioMutations: StoreMutationTree = {
    [MUTATION_ADD_PORTFOLIO_PLAN](storeState, payload: PayloadAddPortfolioPlan){
        const plan = add(storeState[STATE_PORTFOLIO_PLANS], payload, (x) => x.name);
        payload.categories.forEach((x) => {
            x.planId = plan.id;
            add(storeState[STATE_PORTFOLIO_CATEGORIES], x);
        });
    },
    [MUTATION_UPDATE_PORTFOLIO_PLAN](storeState, payload: PayloadUpdatePortfolioPlan){
        const portfolioCategories = storeState[STATE_PORTFOLIO_CATEGORIES].items.filter(
            (x) => x.planId === payload.id );
        const portfolioPlanState = storeState[STATE_PORTFOLIO_PLANS];
        const plan = findById(portfolioPlanState, payload.id)!;

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(plan)
            .isUndefined(undefinedMessage("portfolio plan", payload.id, portfolioPlanState.index));
        
        plan.name = payload.name;

        portfolioCategories.forEach((x) => {
            const category = plan.categories.find((y) => y.id === x.id)!;
            category.percent = x.percent;
            x.percent = category.percent; 
        });
    }
}