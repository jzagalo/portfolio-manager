import {
    SECURITY_TERRITORY_DOMESTIC,
    SECURITY_TERRITORY_INTERNATIONAL,
} from "@/store/security-constants";
import { SecurityTerritoryModel } from "@/store/security-territory-model";
import { ISecurityTerritoryModelState } from "@/store/security-types";

const territories: SecurityTerritoryModel[] = [];

function createTerritory(id: number, text: string) {
    territories.push(new SecurityTerritoryModel(id, text));
    return id += 1;
}

let index = 1;
index = createTerritory(index, SECURITY_TERRITORY_DOMESTIC);
index = createTerritory(index, SECURITY_TERRITORY_INTERNATIONAL);

export const initialState: ISecurityTerritoryModelState = {
    index,
    items: territories,
};
