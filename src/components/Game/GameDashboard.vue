<script>
import GameHeader from './GameHeader.vue';
import Tabs from './Tabs.vue';
import Galaxy from './Galaxy/GalaxyMap.vue';

export default {
   name: 'game-dashboard',

   components: {
      GameHeader, Galaxy, Tabs,
   },

   data: () => ({
      managementTab: 'systems',
      managementTabs: [
         { label: 'S', value: 'systems' },
         { label: 'F', value: 'fleets' },
         { label: 'D', value: 'diplomacy' },
         { label: 'L', value: 'log' },
      ],
      actionTabs: '',
   }),
};
</script>

<template>
   <div class="global-page game">
      <GameHeader />

      <div class="dashboard">
         <section class="left">
            <Tabs
               :list="managementTabs"
               :selected="managementTab"
               vertical
               @click="tab => managementTab = tab.value"
            />
         </section>

         <section class="center">
            <Galaxy />
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
      height: 100%;
      flex: 3;
      margin: 0px 10px;
      background: black;
      overflow: scroll;
   }
}
</style>
