import {
    STATE_SECURITIES, STATE_SECURITY_CATEGORIES,
    STATE_SECURITY_MARKETS, STATE_SECURITY_SEGMENTS,
    STATE_SECURITY_TERRITORIES, STATE_SECURITY_TYPES
} from "@/store/store-constants";
import { ISecurityState } from "@/store/security-types";

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
