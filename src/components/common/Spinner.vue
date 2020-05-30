<script>
export default {
   name: 'spinner',

   computed: {
      style() {
         return {
            height: `${this.size}px`,
            width: `${this.size}px`,
            animationDuration: `${this.speed}ms`,
         };
      },
   },

   props: {
      size: { type: Number, default: 100 },
      speed: { type: Number, default: 1500 },
   },
};
</script>

<template>
   <div class="spinner" :style="style" />
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

@keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}

.spinner {
   background: transparent;
   margin-bottom: 20px;
   border: 4px solid $light-dark;
   border-top: 4px solid $blue;
   border-radius: 50%;
   animation-name: spin;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
}
</style>
