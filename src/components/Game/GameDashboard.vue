<script>
import { mapState } from 'vuex';
import ky from 'ky';
import startCase from 'lodash/startCase';
import GameHeader from './GameHeader.vue';
import Tabs from './Tabs.vue';
import ManagementListItem from './Management/ListItem.vue';
import Galaxy from './Galaxy/GalaxyMap.vue';
import SectorView from './Action/SectorView.vue';
import PlanetView from './Action/PlanetView.vue';
import SettlementView from './Action/SettlementView.vue';

export default {
   name: 'game-dashboard',

   components: {
      GameHeader,
      Tabs,
      ManagementListItem,
      Galaxy,
      SectorView,
      PlanetView,
      SettlementView,
   },

   data: () => ({
      managementTab: 'systems',
      managementTabs: [
         { label: 'S', value: 'systems' },
         { label: 'F', value: 'fleets' },
         { label: 'D', value: 'diplomacy' },
         { label: 'L', value: 'log' },
      ],
      managementSystemId: '',

      actionView: '',
      sector: {},

      planets: [],
      loadingPlanets: false,
      planet: {},

      settlements: [],
      loadingSettlements: false,
      settlement: {},
   }),

   computed: {
      ...mapState(['systems', 'fleets']),

      managementTitle() {
         return startCase(this.managementTab);
      },

      /* eslint-disable no-nested-ternary, indent */
      managementItems() {
         return this.managementTab === 'systems' ? this.systems
              : this.managementTab === 'fleets' ? this.fleets
              : this.managementTab === 'diplomacy' ? this.diplomacy
              : this.managementTab === 'log' && this.log;
      },
      /* eslint-enable no-nested-ternary, indent */
   },

   methods: {
      async handleSetSector(sector) {
         if (sector === 'reset') {
            this.actionView = '';
            this.sector = {};
            this.planets = [];
         } else {
            this.handleSetPlanet('reset');
            this.handleSetSettlement('reset');
            this.actionView = 'sector';
            this.sector = sector;
            this.loadingPlanets = true;
            const planets = await ky.get(`/planets/${sector.system.id}`).json();
            this.loadingPlanets = false;
            this.planets = planets;
         }
      },

      async handleSetPlanet(planet) {
         if (planet === 'reset') {
            this.actionView = 'sector';
            this.planet = {};
            this.settlements = [];
         } else {
            this.handleSetSettlement('reset');
            this.actionView = 'planet';
            this.planet = planet;
            this.loadingSettlements = true;
            const settlements = await ky.get(`/settlements/${planet.id}`).json();
            this.loadingSettlements = false;
            this.settlements = settlements;
         }
      },

      handleSetSettlement(settlement) {
         if (settlement === 'reset') {
            this.actionView = 'planet';
            this.settlement = {};
         } else {
            this.actionView = 'settlement';
            this.settlement = settlement;
         }
      },
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
               @click="tab => managementTab = tab.value"
            />
            <div class="container">
               <span class="title">{{ managementTitle }}</span>
               <ManagementListItem
                  v-for="item in managementItems"
                  :key="item.id"
                  :item="item"
               />
            </div>
         </section>

         <section class="center">
            <Galaxy @setSector="handleSetSector" />
         </section>

         <section class="right">
            <SectorView
               v-if="sector.coords"
               :sector="sector"
               :planets="planets"
               :loadingPlanets="loadingPlanets"
               :planetSelected="actionView === 'planet'"
               :settlementSelected="actionView === 'settlement'"
               @setPlanet="handleSetPlanet"
            />
            <PlanetView
               :planet="planet"
               :settlements="settlements"
               :loadingSettlements="loadingSettlements"
               :settlementSelected="actionView === 'settlement'"
               @setSettlement="handleSetSettlement"
               @close="handleSetPlanet"
            />
            <SettlementView
               :settlement="settlement"
               @close="handleSetSettlement"
            />
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

      .container {
         height: 100%;
         width: 100%;
         display: flex;
         flex-direction: column;
         align-items: center;

         .title {
            width: 100%;
            padding: 5px;
            font-size: 20px;
         }
      }
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
