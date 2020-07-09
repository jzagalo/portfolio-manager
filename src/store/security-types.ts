
import {
        STATE_SECURITY_MARKETS, STATE_SECURITY_SEGMENTS,
        STATE_SECURITY_TERRITORIES,
        STATE_SECURITY_TYPES,
        STATE_SECURITY_CATEGORIES,STATE_SECURITIES,
        GETTER_SECURITIES,GETTER_SECURITY,GETTER_SECURITY_CATEGORIES,
        GETTER_SECURITY_CATEGORY,GETTER_SECURITY_MARKET,
        GETTER_SECURITY_MARKETS,GETTER_SECURITY_SEGMENT,
        GETTER_SECURITY_SEGMENTS,GETTER_SECURITY_TERRITORIES,
        GETTER_SECURITY_TERRITORY,GETTER_SECURITY_TYPE,
        GETTER_SECURITY_TYPES,
    } from "@/store/store-constants";

import { SecurityMarketModel} from "@/store/security-market-model";
import { SecuritySegmentModel } from "@/store/security-segment-model";
import { SecurityTerritoryModel } from "@/store/security-territory-model";
import { SecurityTypeModel } from "@/store/security-type-model";
import { SecurityCategoryModel } from "@/store/security-category-model";
import { SecurityModel } from "@/store/security-model";

export interface ISecurityModelState {
    index: number;
    items: SecurityModel[];
}

export enum SecurityRecommendations {
    Buy,
    Sell,
    Hold,
}

export interface ISecurityCategoryModelState {
    index: number;
    items: SecurityCategoryModel[];
}

export interface ISecurityTypeModelState {
    index: number;
    items: SecurityTypeModel[];
}

export interface ISecurityTerritoryModelState{
    index: number;
    items: SecurityTerritoryModel[];
}
export interface ISecurityMarketsModelState {
    index: number;
    items: SecurityMarketModel[];
}
export interface ISecuritySegmentModelState {
    index: number;
    items: SecuritySegmentModel[];
}

export interface ISecurityState {
    [STATE_SECURITY_MARKETS]: ISecurityMarketsModelState;
    [STATE_SECURITY_SEGMENTS]: ISecuritySegmentModelState;
    [STATE_SECURITY_TERRITORIES]: ISecurityTerritoryModelState;
    [STATE_SECURITY_TYPES]: ISecurityTypeModelState;
    [STATE_SECURITY_CATEGORIES]: ISecurityCategoryModelState;
    [STATE_SECURITIES]: ISecurityModelState;
}

export type GetterCategory = (id: number) => SecurityCategoryModel;
export type GetterMarket = (id: number) => SecurityMarketModel;
export type GetterSecurity = (id: number) => SecurityModel;
export type GetterSegment = (id: number) => SecuritySegmentModel;
export type GetterTerritory = (id: number) => SecurityTerritoryModel;
export type GetterType = (id: number) => SecurityTypeModel;

export interface ISecurityGetters {
    [GETTER_SECURITY_MARKET]: GetterMarket;
    [GETTER_SECURITY_MARKETS]: SecurityMarketModel[];
    [GETTER_SECURITIES]: SecurityModel[];
    [GETTER_SECURITY]: GetterSecurity;
    [GETTER_SECURITY_CATEGORIES]: SecurityCategoryModel[];
    [GETTER_SECURITY_CATEGORY]: GetterCategory;
    [GETTER_SECURITY_SEGMENT]: GetterSegment;
    [GETTER_SECURITY_SEGMENTS]: SecuritySegmentModel[];
    [GETTER_SECURITY_TERRITORIES]: SecurityTerritoryModel[];
    [GETTER_SECURITY_TERRITORY]: GetterTerritory;
    [GETTER_SECURITY_TYPE]: GetterType;
    [GETTER_SECURITY_TYPES]: SecurityTypeModel[];
}

export type PayloadUpdateSecurity = SecurityModel;
export type PayloadUpdateSecurityCategory = SecurityCategoryModel;
export type PayloadUpdateSecurityMarket = SecurityMarketModel;
export type PayloadUpdateSecuritySegment = SecuritySegmentModel;
export type PayloadUpdateSecurityTerritory = SecurityTerritoryModel;
export type PayloadUpdateSecurityType = SecurityTypeModel;
export type PayloadAddSecurity = SecurityModel;
export type PayloadAddSecurityCategory = SecurityCategoryModel;
export type PayloadAddSecurityMarket = SecurityMarketModel;
export type PayloadAddSecuritySegment = SecuritySegmentModel;
export type PayloadAddSecurityTerritory = SecurityTerritoryModel;
export type PayloadAddSecurityType = SecurityTypeModel;