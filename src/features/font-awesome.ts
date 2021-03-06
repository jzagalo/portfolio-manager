import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleLeft,
    faCog,
    faMoneyBill,
    faChartPie,
    faPlus,
    faTimes,
    faHome,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleLeft);
library.add(faCog);
library.add(faHome);
library.add(faWallet);
library.add(faPlus);
library.add(faTimes);
library.add(faMoneyBill);
library.add(faChartPie);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);