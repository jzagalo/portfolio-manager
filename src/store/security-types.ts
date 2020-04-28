import { STATE_SECURITY_MARKETS, STATE_SECURITY_SEGMENTS,
        STATE_SECURITY_TERRITORIES, STATE_SECURITY_TYPES,  
        STATE_SECURITY_CATEGORIES, STATE_SECURITIES,           
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
