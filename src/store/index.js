import Vue from 'vue';
import Vuex from 'vuex';
import gameData from './modules/gameDataModule';

Vue.use(Vuex);

const initialState = () => ({
   user: {},
   games: [],
   galaxy: {},
   systems: [],
   fleets: [],
   diplomacy: [],
   log: [
      { name: 'Start Game' },
      { name: 'Win Game' },
      { name: 'End Game' },
   ],
});

export default new Vuex.Store({
   state: initialState,

   // (state, getters, rootState, rootGetters)
   getters: {},

   // (state, payload)
   mutations: {
      resetStore: state => {
         const s = initialState();
         Object.keys(s).forEach(key => {
            state[key] = s[key];
         });
      },

      setStore: ( state, data ) => {
         Object.keys(data).forEach(key => {
            state[key] = data[key];
         });
      },
   },

   /**
    * ({ state, commit, dispatch, rootState, rootGetters }, payload)
    * commit for mutations
    * dispatch for actions
    */
   actions: {},

   modules: {
      gameData,
   },
});
