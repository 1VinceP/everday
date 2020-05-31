<script>
import { mapState, mapActions } from 'vuex';
import { Spinner } from '@/components/common';
import CollectionItem from './ActionCollectionItem.vue';

export default {
   name: 'sector-view',

   components: { CollectionItem, Spinner },

   computed: {
      ...mapState(['galaxy']),
      ...mapState('gameData', [
         'actionView',
         'sector',
         'planets',
         'loadingPlanets',
      ]),

      title() {
         return this.sector.isSystem
            ? this.sector.system.name
            : `${this.galaxy.name} ${this.sector.coords.x}0${this.sector.coords.y}0`;
      },

      planetSelected() { return this.actionView === 'planet'; },

      settlementSelected() { return this.actionView === 'settlement'; },
   },

   methods: {
      ...mapActions('gameData', ['setPlanet']),
   },
};
</script>

<template>
   <div :class="['sector-view', {
      fade: planetSelected,
      'double-fade': settlementSelected,
      'loading-planets': loadingPlanets,
   }]">
      <h1 class="title">{{ title }}</h1>

      <Spinner v-if="loadingPlanets" :size="40" :speed="400" />
      <div v-else class="planets">
         <CollectionItem
            v-for="planet in planets"
            :key="planet.id"
            :item="planet"
            @click="setPlanet(planet)"
         />
      </div>

      <div class="foot"></div>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.sector-view {
   height: 100%;
   width: 100%;
   background: $light-dark;
   display: flex;
   flex-direction: column;
   align-items: center;
   transition: all .2s ease-in-out;
   &.fade {
      background: $dark;
      opacity: 0.5;
      transform: scale(0.98);
   }
   &.double-fade {
      opacity: 0.25;
      transform: scale(0.96);

      .planets { visibility: hidden; }
   }
   &.loading-planets { justify-content: space-between; }

   .title {
      width: 100%;
      padding: 10px;
      background: $blue;
      font-size: 24px;
   }

   .planets { width: 100%; }
}
</style>
