<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Spinner } from '@/components/common';
import CollectionItem from './ActionCollectionItem.vue';

export default {
   name: 'planet-view',

   components: { CollectionItem, Spinner },

   computed: {
      ...mapState('gameData', [
         'actionView',
         'planet',
         'settlements',
         'loadingSettlements',
      ]),
   },

   methods: {
      ...mapMutations('gameData', ['clearGameData']),
      ...mapActions('gameData', ['setSettlement']),
   },
};
</script>

<template>
   <div class="planet-view">
      <span class="title">
         <span class="pad" />
         <h1>{{ planet.name }}</h1>
         <span class="pad close" @click="clearGameData('planet')">X</span>
      </span>

      <Spinner v-if="loadingSettlements" :size="40" :speed="400" />
      <div v-else class="settlements">
         <CollectionItem
            v-for="settlement in settlements"
            :key="settlement.id"
            :item="settlement"
            @click="setSettlement(settlement)"
         />
      </div>

      <div class="foot" />
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.planet-view {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   &.loading-settlements { justify-content: space-between; }

   .title {
      width: 100%;
      background: $blue;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 22px;

      .pad { width: 20px; }

      .close {
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 14px;
         cursor: pointer;
      }
   }

   .settlements {  width: 100%; }
}
</style>
