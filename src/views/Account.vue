<script>
import ky from 'ky';
import { mapState, mapMutations } from 'vuex';
import SiteHeader from '@/components/SiteHeader.vue';
import Game from '@/components/Account/AccountGameCard.vue';

export default {
   name: 'account',

   components: { SiteHeader, Game },

   data: () => ({
      news: [],
      loadingNews: false,
   }),

   computed: {
      ...mapState(['user', 'games']),

      canCreateGame() {
         let flag = true;
         if (!this.user.tier && this.games.length >= 1) flag = false;
         else if (this.user.tier === 'advanced' && this.games.length >= 2) flag = false;
         else if (this.user.tier === 'superior' && this.games.length >= 3) flag = false;

         return flag;
      },
   },

   methods: {
      ...mapMutations(['setStore']),

      async fetchGames() {
         this.loadingGames = true;

         const games = await ky.get(`/games/${this.user.id}`, {
            headers: { 'user-id': this.user.id },
         }).json();
         this.setStore({ games });
         this.loadingGames = false;
      },

      async onCreateGame() {
         const games = await ky.post('/games', {
            headers: { 'user-id': this.user.id },
         }).json();
         this.setStore({ games });
      },

      async fetchNews() {
         this.loadingNews = true;

         const news = await ky.get('/news').json();
         this.news = news;
         this.loadingNews = false;
      },
   },

   async created() {
      this.fetchGames();
      this.fetchNews();
   },
};
</script>

<template>
   <div class="global-page">
      <SiteHeader />

      <div class="account">
         <section class="games">
            <div class="section-title">Games</div>
            <Game v-for="game in games" :key="game.id" :game="game" />
            <button v-show="canCreateGame" @click="onCreateGame" class="create-game">
               Create Game
            </button>
         </section>

         <section class="feed">
            <div class="section-title">Feed</div>

            <div class="item">Your Activity</div>
            <div class="item">Friend&apos;s Activity</div>
            <!-- <div class="item">Merchandise</div> -->
         </section>

         <section class="news">
            <div class="section-title">News</div>

            <div
               v-for="article in news"
               :key="article.id"
               :class="['article', article.color]"
               @click="$router.push(`/news/${article.id}`)"
            >
               <div class="title">{{ article.title }}</div>
            </div>
         </section>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../variables.scss';

.account {
   width: 100%;
   display: flex;
   justify-content: space-between;

   .section-title {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 16px 0px;
   }

   .games {
      height: $page-height;
      flex: 1;
      padding: 10px;

      .create-game {
         width: 100%;
         background: green;
         border: none;
         cursor: pointer;
      }
   }

   .feed {
      flex: 2;
      padding: 10px;

      .item {
         height: 300px;
         background: $light-dark;
         margin-bottom: 10px;
         border-radius: 3px;
         padding-top: 10px;
      }
   }

   .news {
      flex: 1;
      padding: 10px;

      .article {
         height: 200px;
         width: 100%;
         display: flex;
         flex-direction: column;
         justify-content: flex-end;
         border: 2px solid $dark;
         cursor: pointer;
         &.blue { background: linear-gradient(aquamarine, blue); }
         &.red { background: linear-gradient(orange, red); }
         &.green { background: linear-gradient(yellow, limegreen) }
         &:not(:last-child) { margin-bottom: 10px; }
         &:hover { border: 2px solid white; }

         .title {
            width: 100%;
            display: flex;
            background: linear-gradient(#0000, #000a);
            align-items: center;
            padding: 10px;
            font-size: 20px;
         }
      }
   }
}

@media (max-width: 750px) {
   .account {
      height: 100%;
      flex-direction: column;

      .center {
         min-height: 100px;
         flex: auto,
      }

      .news-column {
         min-height: 100px;
      }
   }
}
</style>
