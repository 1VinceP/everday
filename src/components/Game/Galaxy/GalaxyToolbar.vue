<script>
export default {
   name: 'galaxy-toolbar',

   methods: {
      increaseZoom() {
         this.zoom += 0.1;
      },

      decreaseZoom() {
         this.zoom -= 0.1;
      },

      resetZoom() {
         this.zoom = 1;
      },
   },

   props: {
      zoom: { type: Number, required: true },
   },
};
</script>

<template>
   <div class="toolbar">
      <span @click="$emit('alterZoom', zoom + 0.1)">Zoom In</span>
      <span @click="$emit('alterZoom', zoom - 0.1)">Zoom Out</span>
      <span @click="$emit('alterZoom', 1)">Reset Zoom</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.toolbar {
   height: 30px;
   width: 100%;
   background: $light-dark;
   display: flex;
}
</style>
