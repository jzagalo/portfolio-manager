import {
    ACTION_UPDATE_SECURITY, ACTION_UPDATE_SECURITY_CATEGORY,
    ACTION_UPDATE_SECURITY_MARKET, ACTION_UPDATE_SECURITY_SEGMENT,
    ACTION_UPDATE_SECURITY_TERRITORY, ACTION_UPDATE_SECURITY_TYPE,
    ACTION_ADD_SECURITY, ACTION_ADD_SECURITY_CATEGORY,
    ACTION_ADD_SECURITY_MARKET,  ACTION_ADD_SECURITY_SEGMENT,
    ACTION_ADD_SECURITY_TERRITORY,  ACTION_ADD_SECURITY_TYPE,
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
    MUTATION_ADD_SECURITY, MUTATION_ADD_SECURITY_MARKET, MUTATION_ADD_SECURITY_CATEGORY,
    MUTATION_ADD_SECURITY_SEGMENT, MUTATION_ADD_SECURITY_TERRITORY,  MUTATION_ADD_SECURITY_TYPE,
} from "@/store/store-constants";
import { Store } from "vuex";

import { StoreActions, StoreActionValidator } from "@/store/store-action-validators";
import { findAll , findById, undefinedMessage, add } from "@/store/functions";
import {
        ISecurityState, ISecurityGetters,
        PayloadUpdateSecurity, PayloadUpdateSecurityCategory,
        PayloadUpdateSecurityMarket, PayloadUpdateSecuritySegment,
        PayloadUpdateSecurityTerritory, PayloadUpdateSecurityType,
        PayloadAddSecurity, PayloadAddSecurityCategory,
        PayloadAddSecurityMarket,PayloadAddSecuritySegment,
        PayloadAddSecurityTerritory, PayloadAddSecurityType,
 } from "@/store/security-types";
import { IStoreState, StoreGetterTree, StoreActionTree, StoreContext, StoreMutationTree } from "@/store/store-types";

import { initialState as categoryState } from "@/store/security-category-initial-state";
import { initialState as marketState } from "@/store/security-market-initial-state";
import { initialState as securityState } from "@/store/security-model-initial-state";
import { initialState as segmentState } from "@/store/security-segment-initial-state";
import { initialState as territoryState } from "@/store/security-territory-initial-state";
import { initialState as typeState } from "@/store/security-type-initial-state";

const storeActionValidator = new StoreActionValidator();

function formatSecurity(payload: PayloadUpdateSecurity | PayloadAddSecurity){
    payload.symbol = payload.symbol.toUpperCase();
}

function formatSecurityDescriptor(
    payload: | PayloadAddSecuritySegment | PayloadAddSecurityTerritory | PayloadAddSecurityType
             | PayloadUpdateSecuritySegment | PayloadAddSecurityTerritory | PayloadUpdateSecurityType
){
    payload.text = payload.text.toLowerCase()
                    .split(" ")
                    .map((x) => `${x.charAt(0).toUpperCase}${x.slice(1)}`)
                    .join(" ");
}

function formatSecurityMarket(payload: PayloadAddSecurityMarket | PayloadUpdateSecurityMarket){
    payload.text = payload.text.toUpperCase();
}

function hydrateSecurity(store: Store<IStoreState>, payload: PayloadUpdateSecurity | PayloadAddSecurity){
    const category = (store.getters as ISecurityGetters)[GETTER_SECURITY_CATEGORY](payload.categoryId);
    const market = (store.getters as ISecurityGetters)[GETTER_SECURITY_MARKET](payload.marketId);

    payload.setCategory(category);
    payload.setMarket(market);
}

function hydrateSecurityCategory(
    store: Store<IStoreState>,
    payload: PayloadAddSecurityCategory | PayloadUpdateSecurityCategory){
        const segment = (store.getters as ISecurityGetters)[GETTER_SECURITY_SEGMENT](payload.segmentId);
        const territory = (store.getters as ISecurityGetters)[GETTER_SECURITY_TERRITORY](payload.territoryId);
        const type = (store.getters as ISecurityGetters)[GETTER_SECURITY_TYPE](payload.typeId);

        payload.setSegment(segment);
        payload.setSegment(territory);
        payload.setType(type);
 }


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
    [GETTER_SECURITY_CATEGORY]:(state, getters: ISecurityGetters) => {
        return (id: number) => {
            const category = state[STATE_SECURITY_CATEGORIES].items.find((x) => x.id === id);

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(category)
                .isUndefined(undefinedMessage("category", id, state[STATE_SECURITY_CATEGORIES].index));

            const segment = getters[GETTER_SECURITY_SEGMENT](category!.segmentId);
            const territory = getters[GETTER_SECURITY_TERRITORY](category!.territoryId);
            const type = getters[GETTER_SECURITY_TYPE](category!.typeId);
           
            return category!
                .setSegment(segment!)
                .setTerritory(territory!)
                .setType(type!);
        };
    },

    [GETTER_SECURITY_MARKET]: (state) => {
        return (id: number) => {
            const market = findById(state[STATE_SECURITY_MARKETS], id);

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(market)
                .isUndefined(undefinedMessage("market", id, state[STATE_SECURITY_MARKETS].index));

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
        hydrateSecurity(this, payload);
        formatSecurity(payload);        
        commit(MUTATION_UPDATE_SECURITY, payload);
    },
    [ACTION_UPDATE_SECURITY_CATEGORY](this: Store<IStoreState>, { commit } : StoreContext,
        payload: PayloadUpdateSecurityCategory,){
            hydrateSecurityCategory(this, payload);
            commit(MUTATION_UPDATE_SECURITY_CATEGORY, payload);
    },
    [ACTION_UPDATE_SECURITY_SEGMENT](this: Store<IStoreState>, {commit}: StoreContext, payload: PayloadUpdateSecuritySegment){
        formatSecurityDescriptor
        commit(MUTATION_UPDATE_SECURITY_SEGMENT, payload);
    },
    [ACTION_UPDATE_SECURITY_TERRITORY]( this: Store<IStoreState>, { commit }: StoreContext, payload: PayloadUpdateSecurityTerritory) {
        formatSecurityDescriptor
        commit(MUTATION_UPDATE_SECURITY_TERRITORY, payload);
    },
    [ACTION_UPDATE_SECURITY_MARKET](this: Store<IStoreState>, { commit }: StoreContext, payload: PayloadUpdateSecurityMarket){
        formatSecurityMarket(payload);
        commit(MUTATION_UPDATE_SECURITY_MARKET, payload);
    },
    [ACTION_UPDATE_SECURITY_TYPE](this: Store<IStoreState>, { commit }: StoreContext, payload: PayloadUpdateSecurityType){
        formatSecurityDescriptor(payload);
        commit(MUTATION_UPDATE_SECURITY_TYPE, payload);
    },
    [ACTION_ADD_SECURITY](this, {commit}, payload: PayloadAddSecurity){
        hydrateSecurity(this , payload);
        formatSecurity(payload);
        commit(MUTATION_ADD_SECURITY, payload);
    },
    [ACTION_ADD_SECURITY_CATEGORY](this, { commit }, payload: PayloadAddSecurityCategory){
        hydrateSecurityCategory(this, payload);
        commit(MUTATION_ADD_SECURITY_CATEGORY, payload);
    },
    [ACTION_ADD_SECURITY_MARKET](this, {commit}, payload: PayloadAddSecurityMarket){
        formatSecurityMarket(payload);
        commit(MUTATION_ADD_SECURITY_MARKET, payload);
    },
    [ACTION_ADD_SECURITY_SEGMENT](this, { commit }, payload: PayloadAddSecuritySegment) {
        formatSecurityDescriptor
        commit(MUTATION_ADD_SECURITY_SEGMENT, payload);
    },
    [ACTION_ADD_SECURITY_TERRITORY](this, { commit }, payload: PayloadAddSecurityTerritory) {
        formatSecurityDescriptor
        commit(MUTATION_ADD_SECURITY_TERRITORY, payload);
    },
    [ACTION_ADD_SECURITY_TYPE](this, { commit }, payload: PayloadAddSecurityType) {
        formatSecurityDescriptor
        commit(MUTATION_ADD_SECURITY_TYPE, payload);
    },
}

export const securitiesMutations: StoreMutationTree = {
    [MUTATION_UPDATE_SECURITY](state: IStoreState, payload: PayloadUpdateSecurity) {
        const security = findById(state[STATE_SECURITIES], payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(security)
            .isUndefined(undefinedMessage("security", payload.id, state[STATE_SECURITIES].index));

        security!.categoryId = payload.categoryId;
        security!.last = payload.last;
        security!.marketId = payload.marketId;
        security!.recommendation = payload.recommendation;
        security!.symbol = payload.symbol.toUpperCase();
    },
    [MUTATION_UPDATE_SECURITY_CATEGORY](state:IStoreState, payload: PayloadUpdateSecurityCategory){
        const category = findById(state[STATE_SECURITY_CATEGORIES], payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(category)
            .isUndefined(undefinedMessage("category",payload.id, state[STATE_SECURITY_CATEGORIES].index));

            category!.segmentId = payload.segmentId;
            category!.territoryId = payload.territoryId;
            category!.typeId = payload.typeId;
    },
    [MUTATION_UPDATE_SECURITY_MARKET](state: IStoreState, payload: PayloadUpdateSecurityMarket){
        const market = findById(state[STATE_SECURITY_MARKETS],payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(market)
            .isUndefined(undefinedMessage("segment",payload.id, state[STATE_SECURITY_SEGMENTS].index));
    },
    [MUTATION_UPDATE_SECURITY_SEGMENT](state: IStoreState, payload: PayloadUpdateSecuritySegment){
        const segment = findById(state[STATE_SECURITY_SEGMENTS], payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(segment)
            .isUndefined(undefinedMessage("segment",payload.id, state[STATE_SECURITY_SEGMENTS].index));
        
        segment!.text = payload.text;
    },
    [MUTATION_UPDATE_SECURITY_TERRITORY](state: IStoreState, payload: PayloadUpdateSecurityTerritory) {
        const territory = findById(state[STATE_SECURITY_TERRITORIES], payload.id);

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(territory)
            .isUndefined(undefinedMessage("territory", payload.id, state[STATE_SECURITY_TERRITORIES].index));

        territory!.text = payload.text;
    },

    [MUTATION_UPDATE_SECURITY_TYPE](state: IStoreState, payload: PayloadUpdateSecurityType){
        const type = findById(state[STATE_SECURITY_TYPES], payload.id);      
        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(type)
            .isUndefined(undefinedMessage("type",payload.id, state[STATE_SECURITY_TYPES].index));
        
        type!.text = payload.text;
    },

    [MUTATION_ADD_SECURITY](state, payload: PayloadAddSecurity){
        add(state[STATE_SECURITIES], payload, (x)=> x.symbol);
    },

    [MUTATION_ADD_SECURITY_CATEGORY](state, payload: PayloadAddSecurityCategory){
        add(state[STATE_SECURITY_CATEGORIES], payload, (x) => x.text);
    },

    [MUTATION_ADD_SECURITY_MARKET](state, payload: PayloadAddSecurityMarket){
         add(state[STATE_SECURITY_MARKETS], payload, (x) => x.text);
    },

    [MUTATION_ADD_SECURITY_SEGMENT](state, payload: PayloadAddSecuritySegment){
        add(state[STATE_SECURITY_SEGMENTS], payload, (x) => x.text);
    },

    [MUTATION_ADD_SECURITY_TERRITORY](state, payload: PayloadAddSecurityTerritory){
         add(state[STATE_SECURITY_TERRITORIES], payload, (x) => x.text);
    },

    [MUTATION_ADD_SECURITY_TYPE](state, payload: PayloadAddSecurityType){
        add(state[STATE_SECURITY_TYPES], payload, (x) => x.text);
    },    
}