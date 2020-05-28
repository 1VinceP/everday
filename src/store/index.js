import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = () => ({
   user: {},
   games: [],
   galaxy: {},
   systems: [],
});

export default new Vuex.Store({
   state: initialState,

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

   actions: {
   },

   modules: {
   },
});
