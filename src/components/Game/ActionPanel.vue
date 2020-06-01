<script>
export default {
   name: 'action-panel',

   computed: {
      fadeLevel() { return this.activeTier - this.tier; },

      style() {
         const tierDifference = this.activeTier - this.tier;
         let transform = 'none';
         if (this.tier <= this.activeTier && this.tier > 1) {
            transform = `translateY(calc(-100% + ${(this.tier * 40) - 40}px))`;
         }
         if (this.activeTier > this.tier) {
            if (transform === 'none') {
               transform = `scale(${1 - (0.02 * tierDifference)})`;
            } else {
               transform += ` scale(${1 - (0.02 * tierDifference)})`;
            }
         }

         let bottom = this.tier > 1 ? '-100%' : '0px';
         if (this.activeTier > this.tier) {
            bottom = `calc(${bottom} + ${7 * tierDifference}px)`;
         }

         return {
            boxShadow: this.tier > 1 && '1px 0px 6px 1px #000a',
            filter: `brightness(${1 - (0.2 * tierDifference)})`,
            transform,
            bottom,
         };
      },
   },

   props: {
      tier: { type: Number, required: true },
      activeTier: { type: Number, required: true },
   },
};
</script>

<template>
   <div class="action-panel" :style="style">
      <slot></slot>
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

.action-panel {
   height: 100%;
   width: 100%;
   background: $light-dark;
   display: flex;
   flex-direction: column;
   align-items: center;
   border-top-left-radius: 3px;
   position: absolute;
   // bottom: -100%;
   transition: all .2s ease-in-out;
}
</style>
