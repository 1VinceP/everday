<script>
import { Spinner } from '@/components/common';

export default {
   name: 'game-loader',

   components: { Spinner },

   props: {
      percent: { type: Number },
   },
};
</script>

<template>
   <div class="global-page game-loader">
      <h1 class="title">Everday</h1>

      <div class="loader-container">
         <Spinner />
         <span>Loading Game Data... {{ percent }}%</span>
      </div>

      <span />
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

@keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}

.game-loader {
   height: 100vh;
   justify-content: space-around;
   align-items: center;

   .title {
      font-size: 40px;
      font-style: italic;
   }

   .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
   }
}
</style>
