<script>
import ky from 'ky';
import { mapState, mapMutations } from 'vuex';
import SiteHeader from '@/components/SiteHeader.vue';

export default {
   name: 'account',

   components: { SiteHeader },

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

      async onDelete(id) {
         // TODO: Remove confirm
         // eslint-disable-next-line no-alert
         const confirmed = window.confirm('Are you sure? This game will be gone forever.');
         if (confirmed) {
            const games = await ky.delete(`/games/${id}`, {
               headers: { 'user-id': this.user.id },
            }).json();
            this.setStore({ games });
         }
      },

      async fetchGames() {
         this.loadingGames = true;

         const games = await ky.get(`/games/${this.user.id}`).json();
         this.setStore({ games });
         this.loadingGames = false;
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

            <div v-for="game in games" :key="game.id" class="game">
               <div class="head">{{ game.name }}</div>
               <div class="body"></div>
               <div class="foot">
                  <button class="play">Play</button>
                  <button class="settings">Settings</button>
                  <button class="delete" @click="onDelete(game.id)">Delete</button>
               </div>
            </div>
            <button v-show="canCreateGame" class="create-game">Create Game</button>
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
               class="article"
               @click="$router.push(`/news/${article.id}`)"
            >
               <div>{{ article.title }}</div>
               <div>{{ article.date }}</div>
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
      padding: 16px 16px;
   }

   .games {
      height: $page-height;
      flex: 1;
      padding: 10px;

      .game {
         height: 180px;
         width: 100%;
         background: $light-dark;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: center;
         border-radius: 3px;
         padding: 10px 20px;
         &:not(:last-child) {
            margin-bottom: 10px;
         }

         .head {
            width: 100%;
            display: flex;
         }

         .foot {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
               border: none;
               background: none;
               cursor: pointer;
               &.play { color: lime }
               &.settings { color: blue }
               &.delete { color: red; }
            }
         }
      }

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
      }
   }

   .news {
      flex: 1;
      padding: 10px;

      .article {
         height: 200px;
         width: 100%;
         background: $light-dark;
         border-radius: 3px;
         cursor: pointer;
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
