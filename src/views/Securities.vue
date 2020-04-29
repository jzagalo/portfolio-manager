<template lang="pug">
    div Securities
</template>
<script lang="ts">
import {Vue, Component } from 'vue-property-decorator';
import { GETTER_SECURITIES, GETTER_SECURITY_CATEGORIES,
        Getter, SecurityCategoryModel, SecurityModel,
         } from "@/store";

@Component
export default class Securities extends Vue {
    @Getter(GETTER_SECURITIES) private readonly securities!: SecurityModel[];
    @Getter(GETTER_SECURITY_CATEGORIES) private readonly categories!: SecurityCategoryModel[];

    private created(){
        console.log(this.securities);
        console.log(this.categories);
    }
    
}
</script>