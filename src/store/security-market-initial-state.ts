import { SecurityMarketModel } from "@/store/security-market-model";
import { ISecurityMarketsModelState } from "@/store/security-types";

import {
    SECURITY_MARKET_CBOE,
    SECURITY_MARKET_NASDAQ,
    SECURITY_MARKET_NYSE
} from "@/store/security-constants";

const markets: SecurityMarketModel[] = [];

function createMarket(id: number, text: string) {
    markets.push(new SecurityMarketModel(id, text));
    return id +=1;
}

let index = 1;
index = createMarket(index,SECURITY_MARKET_NYSE);
index = createMarket(index, SECURITY_MARKET_NASDAQ);
index = createMarket(index, SECURITY_MARKET_CBOE);

export const initialState: ISecurityMarketsModelState = {
    index,
    items: markets,
}
