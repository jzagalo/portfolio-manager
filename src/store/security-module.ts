import {
    ACTION_UPDATE_SECURITY, ACTION_UPDATE_SECURITY_CATEGORY,
    ACTION_UPDATE_SECURITY_MARKET, ACTION_UPDATE_SECURITY_SEGMENT,
    ACTION_UPDATE_SECURITY_TERRITORY, ACTION_UPDATE_SECURITY_TYPE,
    STATE_SECURITIES, STATE_SECURITY_CATEGORIES,
    STATE_SECURITY_MARKETS, STATE_SECURITY_SEGMENTS,
    STATE_SECURITY_TERRITORIES, STATE_SECURITY_TYPES,
    GETTER_SECURITIES, GETTER_SECURITY, GETTER_SECURITY_CATEGORIES,
    GETTER_SECURITY_CATEGORY, GETTER_SECURITY_MARKET,
    GETTER_SECURITY_MARKETS, GETTER_SECURITY_SEGMENT,
    GETTER_SECURITY_SEGMENTS, GETTER_SECURITY_TERRITORIES,
    GETTER_SECURITY_TERRITORY, GETTER_SECURITY_TYPE,
    GETTER_SECURITY_TYPES,
    MUTATION_UPDATE_SECURITY, MUTATION_UPDATE_SECURITY_CATEGORY,
    MUTATION_UPDATE_SECURITY_MARKET, MUTATION_UPDATE_SECURITY_SEGMENT,
    MUTATION_UPDATE_SECURITY_TERRITORY,  MUTATION_UPDATE_SECURITY_TYPE,
} from "@/store/store-constants";
import { Store } from "vuex";

import { StoreActions, StoreActionValidator } from "@/store/store-action-validators";
import { findAll , findById, undefinedMessage } from "@/store/functions";
import {
        ISecurityState, ISecurityGetters,
        PayloadUpdateSecurity, PayloadUpdateSecurityCategory,
        PayloadUpdateSecurityMarket, PayloadUpdateSecuritySegment,
        PayloadUpdateSecurityTerritory, PayloadUpdateSecurityType,
 } from "@/store/security-types";
import { IStoreState, StoreGetterTree, StoreActionTree, StoreContext, StoreMutationTree } from "@/store/store-types";

import { initialState as categoryState } from "@/store/security-category-initial-state";
import { initialState as marketState } from "@/store/security-market-initial-state";
import { initialState as securityState } from "@/store/security-model-initial-state";
import { initialState as segmentState } from "@/store/security-segment-initial-state";
import { initialState as territoryState } from "@/store/security-territory-initial-state";
import { initialState as typeState } from "@/store/security-type-initial-state";

const storeActionValidator = new StoreActionValidator();
export const securitiesState: ISecurityState = {
    [STATE_SECURITIES]: securityState,
    [STATE_SECURITY_CATEGORIES]: categoryState,
    [STATE_SECURITY_MARKETS]: marketState,
    [STATE_SECURITY_TERRITORIES]: territoryState,
    [STATE_SECURITY_TYPES]: typeState,
    [STATE_SECURITY_SEGMENTS]: segmentState,
}

export const securitiesGetters: StoreGetterTree = {

    [GETTER_SECURITIES]:(state: IStoreState, getters: ISecurityGetters) => {
        return state[STATE_SECURITIES].items.map((x) => getters[GETTER_SECURITY](x.id));
    },
    [GETTER_SECURITY]: (state: IStoreState, getters: ISecurityGetters) => {
        return (id: number) => {

            const security = findById(state[STATE_SECURITIES], id);
            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(security)
                .isUndefined(undefinedMessage("security", id, state[STATE_SECURITIES].index));

            const category = getters[GETTER_SECURITY_CATEGORY](security!.categoryId);
            const market = getters[GETTER_SECURITY_MARKET](security!.marketId);

            return security!
                    .setCategory(category)
                    .setMarket(market);

        };
    },

    [GETTER_SECURITY_CATEGORIES]: (state: IStoreState, getters: ISecurityGetters) => {
        return state[STATE_SECURITY_CATEGORIES].items.map((x) => getters[GETTER_SECURITY_CATEGORY](x.id));
    },
    [GETTER_SECURITY_CATEGORY]:(state: IStoreState) => {
        return (id: number) => {
            const category = state[STATE_SECURITY_CATEGORIES].items.find((x) => x.id === id);
            if (typeof(category) === "undefined") {
                throw new Error(`Unable to find category with id: ${id}.`);
            }
            const segment = state[STATE_SECURITY_SEGMENTS].items.find((x) => x.id === category.segmentId);
            if (typeof(segment) === "undefined") {
                throw new Error(`Unable to find segment with id: ${category.segmentId}.`);
            }
            const territory = state[STATE_SECURITY_TERRITORIES].items.find((x) => x.id === category.territoryId);
            if (typeof(territory) === "undefined") {
                throw new Error(`Unable to find territory with id: ${category.territoryId}.`);
            }
            const type = state[STATE_SECURITY_TYPES].items.find((x) => x.id === category.typeId);
            if (typeof(type) === "undefined") {
                throw new Error(`Unable to find security type with id: ${category.typeId}.`);
            }
            return category
                .setSegment(segment)
                .setTerritory(territory)
                .setType(type);
        };
    },

    [GETTER_SECURITY_MARKET]: (state: IStoreState) => {
        return (id: number) => {
            const market = findById(state[STATE_SECURITY_MARKETS], id);

            return market;
        }
    },

    [GETTER_SECURITY_MARKETS]: (state: IStoreState) => {
        return findAll(state[STATE_SECURITY_MARKETS]);
    },

    [GETTER_SECURITY_SEGMENT]:(state: IStoreState) => {
        return (id: number) => {
            const segment = findById(state[STATE_SECURITY_SEGMENTS], id);

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(segment)
                .isUndefined(undefinedMessage("segment", id, state[STATE_SECURITY_SEGMENTS].index));

            return segment;
        }
    },

    [GETTER_SECURITY_SEGMENTS]: (state: IStoreState) => {
        return findAll(state[STATE_SECURITY_SEGMENTS]);
    },

    [GETTER_SECURITY_TERRITORIES]: (state: IStoreState) => {
        return findAll(state[STATE_SECURITY_TERRITORIES]);
    },

    [GETTER_SECURITY_TERRITORY]: (state: IStoreState) => {
        return (id: number) => {
            const territory = findById(state[STATE_SECURITY_TERRITORIES],id);

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(territory)
                .isUndefined(undefinedMessage("territory", id, state[STATE_SECURITY_TERRITORIES].index));

            return territory;
        }
    },
    [GETTER_SECURITY_TYPE] : (state: IStoreState) => {
        return (id: number) => {
            const type = findById(state[STATE_SECURITY_TYPES], id);

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(type)
                .isUndefined(undefinedMessage("type", id, state[STATE_SECURITY_TYPES].index));

            return type;
        }
    },

    [GETTER_SECURITY_TYPES]: (state: IStoreState) => {
        return findAll(state[STATE_SECURITY_TYPES]);
    },
}

export const securitiesActions: StoreActionTree = {
    [ACTION_UPDATE_SECURITY](this: Store<IStoreState>, {commit}: StoreContext, payload: PayloadUpdateSecurity){
        const category = (this.getters as ISecurityGetters)[GETTER_SECURITY_CATEGORY](payload.categoryId);
        const market = (this.getters as ISecurityGetters)[GETTER_SECURITY_MARKET](payload.marketId);

        payload.setCategory(category);
        payload.setMarket(market);
        commit(MUTATION_UPDATE_SECURITY, payload);
    },
    [ACTION_UPDATE_SECURITY_CATEGORY](this: Store<IStoreState>, { commit } : StoreContext,
        payload: PayloadUpdateSecurityCategory,){
            const segment = (this.getters as ISecurityGetters)[GETTER_SECURITY_SEGMENT](payload.segmentId);
            const territory = (this.getters as ISecurityGetters)[GETTER_SECURITY_TERRITORY](payload.territoryId);
            const type = (this.getters as ISecurityGetters)[GETTER_SECURITY_SEGMENT](payload.typeId);

            payload.setSegment(segment);
            payload.setSegment(territory);
            payload.setType(type);
            commit(MUTATION_UPDATE_SECURITY_CATEGORY, payload);
    },
    [ACTION_UPDATE_SECURITY_MARKET](this: Store<IStoreState>, { commit }: StoreContext, payload: PayloadUpdateSecurityMarket){
        commit(MUTATION_UPDATE_SECURITY_MARKET, payload);
    },
    [ACTION_UPDATE_SECURITY_TYPE](this: Store<IStoreState>, { commit }: StoreContext, payload: PayloadUpdateSecurityType){
        commit(MUTATION_UPDATE_SECURITY_TYPE, payload);
    }
}

export const securitiesMutations: StoreMutationTree = {
    [MUTATION_UPDATE_SECURITY](state: IStoreState, payload: PayloadUpdateSecurity){
        const security = findById(state[STATE_SECURITIES], payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(security)
            .isUndefined(undefinedMessage("security", payload.id, state[STATE_SECURITIES].index));

        security!.categoryId = payload.categoryId;
        security!.last = payload.last
    }
}