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

      settlementSelected() { return this.actionView === 'settlement'; },
   },

   methods: {
      ...mapMutations('gameData', ['clearGameData']),
      ...mapActions('gameData', ['setSettlement']),
   },
};
</script>

<template>
   <div :class="['planet-view', {
      show: planet.name,
      fade: settlementSelected,
      'loading-settlements': loadingSettlements,
   }]">
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
   height: calc(100% - 45px);
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   background: $light-dark;
   position: absolute;
   bottom: -100%;
   border-top-left-radius: 3px;
   transition: all 200ms ease-in-out;
   &.show {
      display: flex;
      flex-direction: column;
      box-shadow: 1px 0px 6px 1px #000a;
      transform: translateY(calc(-100% - 45px));
      &.fade {
         background: $dark;
         opacity: 0.5;
         transform: translateY(calc(-100% - 45px)) scale(0.98);
      }
   }
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
