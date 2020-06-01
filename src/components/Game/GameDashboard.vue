<script>
import { mapState, mapMutations } from 'vuex';
import GameHeader from './GameHeader.vue';
import Tabs from './Tabs.vue';
import ManagementView from './Management/ManagementView.vue';
import Galaxy from './Galaxy/GalaxyMap.vue';
import ActionPanel from './ActionPanel.vue';
import SectorView from './Action/SectorView.vue';
import PlanetView from './Action/PlanetView.vue';
import SettlementView from './Action/SettlementView.vue';

export default {
   name: 'game-dashboard',

   components: {
      GameHeader,
      Tabs,
      ManagementView,
      Galaxy,
      ActionPanel,
      SectorView,
      PlanetView,
      SettlementView,
   },

   data: () => ({
      managementTabs: [
         { label: 'S', value: 'systems' },
         { label: 'F', value: 'fleets' },
         { label: 'D', value: 'diplomacy' },
         { label: 'L', value: 'log' },
      ],
   }),

   computed: {
      ...mapState(['systems', 'fleets']),
      ...mapState('gameData', ['managementTab', 'activeTier', 'sector', 'planet']),
   },

   methods: {
      ...mapMutations('gameData', ['setGameData']),
   },
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
               @click="tab => setGameData({ managementTab: tab.value })"
            />
            <ManagementView />
         </section>

         <section class="center">
            <Galaxy />
         </section>

         <section class="right">
            <ActionPanel v-if="activeTier > 0" :tier="1" :activeTier="activeTier">
               <SectorView />
            </ActionPanel>
            <ActionPanel :tier="2" :activeTier="activeTier">
               <PlanetView />
            </ActionPanel>
            <ActionPanel :tier="3" :activeTier="activeTier">
               <SettlementView />
            </ActionPanel>
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


   .left {
      flex: 1;
      background: $light-dark;
      display: flex;
   }

   .center {
      height: 100%;
      flex: 3;
      margin: 0px 10px;
      background: black;
      // background: linear-gradient(to bottom right, #000, maroon);
      overflow: scroll;
   }

   .right {
      flex: 1;
      position: relative;
      overflow: hidden;
   }
}
</style>
