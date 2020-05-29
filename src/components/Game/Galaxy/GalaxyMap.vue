<script>
import { mapState } from 'vuex';
import GalaxyToolbar from './GalaxyToolbar.vue';
import GalaxyTile from './GalaxyTile.vue';

export default {
   name: 'galaxy-map',

   components: { GalaxyToolbar, GalaxyTile },

   data: () => ({
      zoom: 1,
      selectedTile: { x: -1, y: -1 },
   }),

   computed: {
      ...mapState(['galaxy', 'systems', 'fleets']),

      zoomScale() {
         return `${70 * this.zoom}px`;
      },
   },

   methods: {
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
            system,
            fleets,
            selected: this.selectedTile.x === x && this.selectedTile.y === y,
         };
      },

      handleTileClick(data) {
         console.log(data);
         this.selectedTile = { x: data.coords.x, y: data.coords.y };
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
         <GalaxyTile
            v-for="n in galaxy.size_x * galaxy.size_y"
            :key="n"
            :data="createData(n)"
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
