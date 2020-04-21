import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleLeft,
    faCog,
    faHome,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleLeft);
library.add(faCog);
library.add(faHome);
library.add(faWallet);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);