import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleLeft,
    faCog,
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
Vue.component("FontAwesomeIcon", FontAwesomeIcon);