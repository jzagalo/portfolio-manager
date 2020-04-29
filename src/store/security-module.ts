import {
    STATE_SECURITIES, STATE_SECURITY_CATEGORIES,
    STATE_SECURITY_MARKETS, STATE_SECURITY_SEGMENTS,
    STATE_SECURITY_TERRITORIES, STATE_SECURITY_TYPES,
    GETTER_SECURITIES, GETTER_SECURITY, GETTER_SECURITY_CATEGORIES,
    GETTER_SECURITY_CATEGORY,
} from "@/store/store-constants";
import { ISecurityState, ISecurityGetters } from "@/store/security-types";
import { IStoreState, StoreGetterTree } from "@/store/store-types";

import { initialState as categoryState } from "@/store/security-category-initial-state";
import { initialState as marketState } from "@/store/security-market-initial-state";
import { initialState as securityState } from "@/store/security-model-initial-state";
import { initialState as segmentState } from "@/store/security-segment-initial-state";
import { initialState as territoryState } from "@/store/security-territory-initial-state";
import { initialState as typeState } from "@/store/security-type-initial-state";

export const securitiesState: ISecurityState = {
    [STATE_SECURITIES]: securityState,
    [STATE_SECURITY_CATEGORIES]: categoryState,
    [STATE_SECURITY_MARKETS]: marketState,
    [STATE_SECURITY_TERRITORIES]: territoryState,
    [STATE_SECURITY_TYPES]: typeState,
    [STATE_SECURITY_SEGMENTS]:segmentState,
}


export const securitiesGetters: StoreGetterTree = {
    [GETTER_SECURITIES]:(state: IStoreState, getters: ISecurityGetters) => {
        return state[STATE_SECURITIES].items.map((x) => getters[GETTER_SECURITY](x.id));
    },
    [GETTER_SECURITY]: (state: IStoreState, getters: ISecurityGetters) => {
        return (id: number) => {
            const security = state[STATE_SECURITIES].items.find((x) => x.id === id);
            if(typeof(security) === "undefined"){
                throw new Error(`Unable to find security with id: ${id}.`);                
            }

            const category = getters[GETTER_SECURITY_CATEGORY](security.categoryId);
            const market = state[STATE_SECURITY_MARKETS].items.find((x) => x.id === security.marketId);
            if(typeof(market) === "undefined"){
                throw new Error(`Unable to find security with id: ${security.marketId}.`);                
            }
            return security
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
   

}