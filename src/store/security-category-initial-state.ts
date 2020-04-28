import { ISecurityCategoryModelState } from "@/store/security-types";
 import { SECURITY_SEGMENT_DEVELOPED_TEXT, SECURITY_SEGMENT_EMERGING_TEXT,
        SECURITY_SEGMENT_LARGE_CAP_TEXT, SECURITY_SEGMENT_MID_CAP_TEXT,
        SECURITY_SEGMENT_SMALL_CAP_TEXT, SECURITY_TERRITORY_DOMESTIC,
        SECURITY_TERRITORY_INTERNATIONAL, SECURITY_TYPE_EQUITY,
        SECURITY_TYPE_FIXED_INCOME, SECURITY_TYPE_SPECIALITY,
     } from "@/store/security-constants";
import { SecurityCategoryModel,ISecurityCategoryModelConfig } from "@/store/security-category-model";
import { initialState as segments } from "@/store/security-segment-initial-state";
import { initialState as territories } from "@/store/security-territory-initial-state";
import { initialState as types } from "@/store/security-type-initial-state";

const largeCap = segments.items.find((x) => x.text === SECURITY_SEGMENT_LARGE_CAP_TEXT)!;
const midCap  = segments.items.find((x) => x.text === SECURITY_SEGMENT_MID_CAP_TEXT)!;
const smallCap  = segments.items.find((x) =>  x.text === SECURITY_SEGMENT_SMALL_CAP_TEXT)!;
const developed = segments.items.find((x) => x.text === SECURITY_SEGMENT_DEVELOPED_TEXT)!;
const emerging = segments.items.find((x) =>  x.text === SECURITY_SEGMENT_EMERGING_TEXT)!;

const domestic = territories.items.find((x) => x.text === SECURITY_TERRITORY_DOMESTIC)!;
const international = territories.items.find((x) => x.text === SECURITY_TERRITORY_INTERNATIONAL)!;

const equity = types.items.find((x) => x.text === SECURITY_TYPE_EQUITY)!;
const fixedIncome = types.items.find((x) =>  x.text === SECURITY_TYPE_FIXED_INCOME)!;
const specialty = types.items.find((x) =>   x.text === SECURITY_TYPE_SPECIALITY)!;

const categories: SecurityCategoryModel[] = [];

function createCategory(config: ISecurityCategoryModelConfig) {
    categories.push(new SecurityCategoryModel(config));
    return Number(config.id += 1);
}

let index = 1;
index = createCategory({ id: index, segmentId: largeCap.id, territoryId: domestic.id, typeId: equity.id });
index = createCategory({ id: index, segmentId: midCap.id, territoryId: domestic.id, typeId: equity.id });
index = createCategory({ id: index, segmentId: smallCap.id, territoryId: domestic.id, typeId: equity.id });
index = createCategory({ id: index, segmentId: developed.id, territoryId: international.id, typeId: equity.id });
index = createCategory({ id: index, segmentId: emerging.id, territoryId: international.id, typeId: equity.id });
index = createCategory({ id: index, segmentId: developed.id, territoryId: domestic.id, typeId: fixedIncome.id });
index = createCategory({ id: index, segmentId: developed.id, territoryId: international.id, typeId: fixedIncome.id });
index = createCategory({ id: index, segmentId: developed.id, territoryId: domestic.id, typeId: specialty.id });

export const initialState: ISecurityCategoryModelState = {
    index,
    items: categories,
};

