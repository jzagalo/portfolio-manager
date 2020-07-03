<template lang="pug">
    div Securities Details
</template>

<script lang="ts">

interface IQuery {
    id: string;
    which: string;
}

import { Component, Inject, Vue } from "vue-property-decorator";
import { RoutingService } from "@/components/routing";

@Component
export default class SecuritiesDetails extends Vue{
    @Inject() private readonly routingService!: RoutingService;

    private mounted(){
        console.log(this.$router.currentRoute.query);
        const id = this.routingService.queryParam<IQuery, number>((x) => x.id, parseInt);
        const which = this.routingService.queryParam<IQuery>((x) => x.which);

        console.log(`${typeof(id)} ${id}`);
        console.log(`${typeof(which)} ${which}`);
    }
}
</script>