import {
    SECURITY_TYPE_EQUITY,
    SECURITY_TYPE_FIXED_INCOME,
    SECURITY_TYPE_SPECIALITY,
} from "@/store/security-constants";
import { SecurityTypeModel } from "@/store/security-type-model";
import { ISecurityTypeModelState } from "@/store/security-types";

const types: SecurityTypeModel[] = [];

function createType(id: number, text: string) {
    types.push(new SecurityTypeModel(id, text));
    return id += 1;
}

let index = 1;
index = createType(index, SECURITY_TYPE_EQUITY);
index = createType(index, SECURITY_TYPE_FIXED_INCOME);
index = createType(index, SECURITY_TYPE_SPECIALITY);

export const initialState: ISecurityTypeModelState = {
    index,
    items: types,
};