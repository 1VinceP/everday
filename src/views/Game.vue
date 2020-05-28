<script>
import ky from 'ky';
import { mapState, mapMutations } from 'vuex';
import GameLoader from '@/components/Game/GameLoader.vue';
import GameDashboard from '@/components/Game/GameDashboard.vue';

export default {
   name: 'game',

   components: { GameLoader, GameDashboard },

   data: () => ({
      loadingPercent: 0,
   }),

   computed: {
      ...mapState(['user', 'gameId']),
   },

   methods: {
      ...mapMutations(['setStore']),

      countPercent(endValue) {
         const intervalId = setInterval(() => {
            if (this.loadingPercent === endValue) {
               clearInterval(intervalId);
            } else {
               this.loadingPercent += 1;
            }
         }, 75);
      },
   },

   async created() {
      const { gameId } = this.$route.params;
      const headers = { 'user-id': this.user.id };

      const players = await ky.get(`/players/${gameId}`, { headers }).json();
      this.setStore({ players });
      this.countPercent(28);

      const { galaxy, systems } = await ky.get(`/galaxy/${gameId}`, { headers }).json();
      this.setStore({ galaxy, systems });
      this.countPercent(73);

      const { fleets, squadrons } = await ky.get(`/fleets/${gameId}`, { headers }).json();
      this.setStore({ fleets, squadrons });
      this.countPercent(100);
   },
};
</script>

<template>
   <div>
      <GameLoader v-if="loadingPercent < 100" :percent="loadingPercent" />
      <GameDashboard />
   </div>
</template>

<style lang="scss" scoped>

</style>
