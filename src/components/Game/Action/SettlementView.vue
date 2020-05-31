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
   <div :class="['settlement-view', { show: settlement.name }]">
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
   height: calc(100% - 90px);
   width: 100%;
   background: $light-dark;
   position: absolute;
   bottom: -100%;
   border-top-left-radius: 3px;
   transition: all 200ms ease-in-out;
   &.show {
      display: flex;
      flex-direction: column;
      box-shadow: 1px 0px 6px 1px #000a;
      transform: translateY(calc(-100% - 90px));
   }

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
