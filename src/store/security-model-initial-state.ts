import { ISecurityModelConfig, SecurityModel } from "@/store/security-model";
import { ISecurityModelState, SecurityRecommendations } from "@/store/security-types";

import {
    SECURITY_MARKET_CBOE,
    SECURITY_MARKET_NASDAQ,
    SECURITY_MARKET_NYSE,
} from "@/store/security-constants";

import { initialState as categories } from "@/store/security-category-initial-state";
import { initialState as markets } from "@/store/security-market-initial-state";

const buy = SecurityRecommendations.Buy;
const hold = SecurityRecommendations.Hold;
const sell = SecurityRecommendations.Sell;

const delc = categories.items[0];
const demc = categories.items[1];
const desc = categories.items[2];
const iedm = categories.items[3];
const ieem = categories.items[4];
const fid = categories.items[5];
const fii = categories.items[6];
const spec = categories.items[7];

const cboe = markets.items.find((x) => x.text === SECURITY_MARKET_CBOE)!;
const nasdaq = markets.items.find((x) => x.text === SECURITY_MARKET_NASDAQ)!;
const nyse = markets.items.find((x) => x.text === SECURITY_MARKET_NYSE)!;

const securities: SecurityModel[] = [];

function createSecurity(id: number, config: Omit<ISecurityModelConfig, "id">) {
    securities.push(new SecurityModel({ id, ...config }));
    return id += 1;
}

const acwv = { categoryId: delc.id, last: 90.27, marketId: cboe.id, recommendation: buy, symbol: "ACWV" };
const bnd = { categoryId: fid.id, last: 83.84, marketId: nyse.id, recommendation: hold, symbol: "BND" };
const bndx = { categoryId: fii.id, last: 58.27, marketId: nasdaq.id, recommendation: buy, symbol: "BNDX" };
const embh = { categoryId: fii.id, last: 24.43, marketId: nyse.id, recommendation: hold, symbol: "EMBH" };
const esgd = { categoryId: iedm.id, last: 60.89, marketId: nasdaq.id, recommendation: hold, symbol: "ESGD" };
const fnde = { categoryId: iedm.id, last: 26.55, marketId: nyse.id, recommendation: buy, symbol: "FNDE" };
const ftec = { categoryId: spec.id, last: 59.49, marketId: nyse.id, recommendation: buy, symbol: "FTEC" };
const lkor = { categoryId: fid.id, last: 56.05, marketId: nasdaq.id, recommendation: hold, symbol: "LKOR" };
const mdyg = { categoryId: demc.id, last: 52.31, marketId: nyse.id, recommendation: sell, symbol: "MDYG" };
const mgk = { categoryId: delc.id, last: 126.26, marketId: nyse.id, recommendation: hold, symbol: "MGK" };
const mlqd = { categoryId: fid.id, last: 51.73, marketId: cboe.id, recommendation: buy, symbol: "MLQD" };
const pcy = { categoryId: fii.id, last: 29.06, marketId: nyse.id, recommendation: hold, symbol: "PCY" };
const qemm = { categoryId: ieem.id, last: 54.64, marketId: nyse.id, recommendation: hold, symbol: "QEMM" };
const schg = { categoryId: delc.id, last: 79.76, marketId: nyse.id, recommendation: buy, symbol: "SCHG" };
const slyg = { categoryId: desc.id, last: 58.70, marketId: nyse.id, recommendation: sell, symbol: "SLYG" };
const vbk = { categoryId: desc.id, last: 179.79, marketId: nyse.id, recommendation: buy, symbol: "VBK" };
const vea = { categoryId: iedm.id, last: 39.35, marketId: nyse.id, recommendation: hold, symbol: "VEA" };
const vis = { categoryId: spec.id, last: 139.01, marketId: nyse.id, recommendation: buy, symbol: "VIS" };
const vot = { categoryId: demc.id, last: 143.52, marketId: nyse.id, recommendation: buy, symbol: "VOT" };
const vwo = { categoryId: ieem.id, last: 39.10, marketId: nyse.id, recommendation: hold, symbol: "VWO" };
const xcem = { categoryId: ieem.id, last: 24.48, marketId: nyse.id, recommendation: hold, symbol: "XCEM" };
const xsoe = { categoryId: ieem.id, last: 26.64, marketId: nyse.id, recommendation: hold, symbol: "XSOE" };

let index = 1;
index = createSecurity(index, acwv);
index = createSecurity(index, bnd);
index = createSecurity(index, bndx);
index = createSecurity(index, embh);
index = createSecurity(index, esgd);
index = createSecurity(index, fnde);
index = createSecurity(index, ftec);
index = createSecurity(index, lkor);
index = createSecurity(index, mdyg);
index = createSecurity(index, mgk);
index = createSecurity(index, mlqd);
index = createSecurity(index, pcy);
index = createSecurity(index, qemm);
index = createSecurity(index, schg);
index = createSecurity(index, slyg);
index = createSecurity(index, vbk);
index = createSecurity(index, vea);
index = createSecurity(index, vis);
index = createSecurity(index, vot);
index = createSecurity(index, vwo);
index = createSecurity(index, xcem);
index = createSecurity(index, xsoe);

export const initialState: ISecurityModelState = {
    index,
    items: securities,
};