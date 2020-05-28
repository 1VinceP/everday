<script>
import GameHeader from './GameHeader.vue';

export default {
   name: 'game-dashboard',

   components: { GameHeader },
};
</script>

<template>
   <div class="global-page game">
      <GameHeader />

      <div class="dashboard">
         <section class="left">

         </section>

         <section class="center">

         </section>

         <section class="right">

         </section>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables';

.dashboard {
   height: $page-height;
   width: 100%;
   display: flex;
   justify-content: space-between;

   .left, .right {
      flex: 1;
      background: $light-dark;
   }

   .center {
      flex: 3;
      margin: 0px 10px;
      background: $light-dark;
   }
}
</style>
