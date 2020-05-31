import ky from 'ky';

const initialState = () => ({
   managementTab: 'systems',

   selectedTile: { x: -1, y: -1 },
   actionView: '',

   sector: {},

   planets: [],
   loadingPlanets: false,
   planet: {},

   settlements: [],
   loadingSettlements: false,
   settlement: {},
});

export default {
   namespaced: true,
   state: initialState,

   getters: {
      managementItems: (state, getters, rootState) => rootState[state.managementTab],
   },

   mutations: {
      setGameData: (state, data) => {
         Object.keys(data).forEach(key => {
            state[key] = data[key];
         });
      },

      selectTile: (state, tile) => {
         state.selectedTile = tile;
      },

      clearGameData: (state, resetValue) => {
         /* eslint-disable indent */
         state.actionView = resetValue === 'sector' ? ''
            : resetValue === 'planet' ? 'sector'
            : resetValue === 'settlement' ? 'planet'
            : state.actionView;

         /* eslint-disable no-fallthrough */
         switch (resetValue) {
            case 'sector':
               state.sector = {};
               state.planets = [];
            case 'planet':
               state.planet = {};
               state.settlements = [];
            case 'settlement':
               state.settlement = {};
               break;
         }
         /* eslint-enable indent, no-fallthrough */
      },
   },

   actions: {
      setSector: async ({ state, commit }, sector) => {
         commit('clearGameData', 'planet');
         state.actionView = 'sector';
         state.sector = sector;
         state.loadingPlanets = true;
         const planets = await ky.get(`/planets/${sector.system.id}`).json();
         state.loadingPlanets = false;
         state.planets = planets;
      },

      setPlanet: async ({ state, commit }, planet) => {
         commit('clearGameData', 'settlement');
         state.actionView = 'planet';
         state.planet = planet;
         state.loadingSettlements = true;
         const settlements = await ky.get(`/settlements/${planet.id}`).json();
         state.loadingSettlements = false;
         state.settlements = settlements;
      },

      setSettlement: ({ state }, settlement) => {
         state.actionView = 'settlement';
         state.settlement = settlement;
      },
   },
};
