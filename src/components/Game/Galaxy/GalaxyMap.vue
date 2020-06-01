<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import generateSector from '@/generators/generateSector';
import GalaxyToolbar from './GalaxyToolbar.vue';
import GalaxySectorTile from './GalaxySectorTile.vue';

export default {
   name: 'galaxy-map',

   components: { GalaxyToolbar, GalaxySectorTile },

   data: () => ({
      zoom: 1,
   }),

   computed: {
      ...mapState(['galaxy', 'systems', 'fleets']),
      ...mapState('gameData', ['selectedTile']),

      zoomScale() {
         return `${60 * this.zoom}px`;
      },
   },

   methods: {
      ...mapMutations('gameData', ['setGameData', 'clearGameData']),
      ...mapActions('gameData', ['setSector']),

      alterZoom(newZoom) {
         if (newZoom <= 0.5) {
            this.zoom = 0.5;
         } else {
            this.zoom = newZoom;
         }
      },

      getCoords(n) {
         const N = n - 1; // zero-indexing n
         const y = Math.floor(N / this.galaxy.size_x);
         const x = N - (this.galaxy.size_x * y);
         return { x, y };
      },

      createData(n) {
         const { x, y } = this.getCoords(n);
         const system = this.systems.find(sys => sys.x === x && sys.y === y);
         const fleets = this.fleets.filter(fleet => fleet.galaxy_x === x && fleet.galaxy_y === y);
         return {
            coords: { x, y },
            system: !system ? generateSector() : system,
            fleets,
            selected: this.selectedTile.x === x && this.selectedTile.y === y,
            isSystem: !!system,
         };
      },

      handleTileClick(data) {
         if (data.selected) {
            this.clearGameData('sector');
            this.setGameData({ selectedTile: { x: -1, y: -1 } });
         } else {
            this.setSector(data);
            this.setGameData({ selectedTile: { x: data.coords.x, y: data.coords.y } });
            this.setGameData({ activeTier: 1 });
         }
      },
   },
};
</script>

<template>
   <div class="galaxy-container">
      <GalaxyToolbar
         :zoom="zoom"
         @alterZoom="alterZoom"
      />
      <div
         class="galaxy"
         :style="{
            gridTemplateColumns: `repeat(${galaxy.size_x}, ${zoomScale})`,
            gridTemplateRows: `repeat(${galaxy.size_y}, ${zoomScale})`,
         }"
      >
         <GalaxySectorTile
            v-for="n in galaxy.size_x * galaxy.size_y"
            :key="n"
            :sector="createData(n)"
            @click="handleTileClick"
         />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.galaxy-container {
   height: 100%;
   width: 100%;

   .galaxy {
      display: grid;
   }
}
</style>
