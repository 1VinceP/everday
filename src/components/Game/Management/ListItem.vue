<script>
import startCase from 'lodash/startCase';
import { mapState, mapActions } from 'vuex';

export default {
   name: 'list-item',

   computed: {
      ...mapState(['fleets']),

      title() { return startCase(this.system.name); },

      style() {
         return {
            height: this.height === 'auto' ? 'auto' : `${this.height}px`,
         };
      },
   },

   methods: {
      ...mapActions('gameData', ['setGameData', 'setSector']),

      createSectorData() {
         const { x, y } = this.system;
         const fleets = this.fleets.filter(fleet => fleet.galaxy_x === x && fleet.galaxy_y === y);
         return {
            coords: { x, y },
            system: this.system,
            fleets,
            selected: true,
            isSystem: true,
         };
      },

      handleClick() {
         this.setSector(this.createSectorData());
         this.setGameData({ selectedTile: { x: this.system.x, y: this.system.y } });
         this.setGameData({ activeTier: 1 });
      },
   },

   props: {
      system: { type: Object, required: true },
      height: { type: Number, default: 100 },
   },
};
</script>

<template>
   <div class="item" :style="style" @click="handleClick">
      <span class="title">{{ title }}</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.item {
   width: 100%;
   transition: background-color .15s ease-in-out;
   &:hover { background: $dark-hover; }
   &:active { border: 1px solid $light-dark; }

   .title {
      width: 100%;
      display: flex;
      padding: 10px;
   }
}
</style>
