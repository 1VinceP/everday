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
      <span>Zoom:</span>
      <span class="circle" @click="$emit('alterZoom', zoom + 0.1)">+</span>
      <span class="circle" @click="$emit('alterZoom', zoom - 0.1)">-</span>
      <span class="reset" @click="$emit('alterZoom', 1)">Reset</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.toolbar {
   height: 30px;
   width: 100%;
   background: $light-dark;
   display: flex;
   align-items: center;
   padding: 0px 10px;

   .circle {
      height: 20px;
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      border: 1px solid white;
      border-radius: 50%;
      cursor: pointer;
      &:hover { background: $dark-hover }
   }

   .reset {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      border: 1px solid white;
      border-radius: 3px;
      padding: 0px 5px;
      cursor: pointer;
      &:hover { background: $dark-hover }
   }
}
</style>
