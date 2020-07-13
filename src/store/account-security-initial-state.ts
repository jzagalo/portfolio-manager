import { IAccountSecurityModelConfig, AccountSecurityModel } from "@/store/account-security-model";
import { IAccountSecurityModelState } from "@/store/account-types";
import { SecurityModel } from "@/store/security-model";

import {initialState as accountState } from "@/store/account-initial-state";
import {initialState as securitiesState } from "@/store/security-model-initial-state";

import { sort } from "@/store/functions";

const accountSecurities: AccountSecurityModel[] = [];

function createAccountSecurity(id: number, security: SecurityModel,
    config: Omit<IAccountSecurityModelConfig, "id">) {
        const existing = accountSecurities.find(
            (x) => x.accountId === config.accountId && x.securityId === config.securityId,
        );

        if(typeof existing === "undefined"){
            const accountSecurity = new AccountSecurityModel({id, ...config});
            accountSecurity.security = security;
            accountSecurities.push(accountSecurity);
            return (id += 1);
        } else {
            existing.shares += config.shares;
            return id;
        }    
}

let index = 1;
if(process.env.NODE_ENV === "development"){
    accountState.items.forEach((x) => {
        for(let i = 0; i < 10; i++) {
            const shares = Math.floor(Math.random() * 100 + 1);
            const securityIndex = Math.floor(Math.random() *(securitiesState.items.length-2) + 1);
            const security = securitiesState.items[securityIndex];
            index = createAccountSecurity(index, security,{
                accountId: x.id, securityId: security.id, shares,
            })
        }
    });    
}

export const initialState: IAccountSecurityModelState = {
    index,
    items: sort(accountSecurities, (x) => x.security.symbol),
}