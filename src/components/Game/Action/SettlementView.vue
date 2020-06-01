<script>
import { mapState, mapMutations } from 'vuex';

export default {
   name: 'settlement-view',

   computed: {
      ...mapState('gameData', ['settlement']),
   },

   methods: {
      ...mapMutations('gameData', ['clearGameData']),
   },
};
</script>

<template>
   <div class="settlement-view">
      <span class="title">
         <span class="pad" />
         <h1>{{ settlement.name }}</h1>
         <span class="pad close" @click="clearGameData('settlement')">X</span>
      </span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.settlement-view {
   height: 100%;
   width: 100%;

   .title {
      width: 100%;
      background: $blue;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 20px;

      .pad { width: 20px; }

      .close {
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 14px;
         cursor: pointer;
      }
   }
}
</style>
