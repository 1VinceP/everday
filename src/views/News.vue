<script>
import ky from 'ky';
import SiteHeader from '@/components/SiteHeader.vue';

export default {
   name: 'news',

   components: { SiteHeader },

   data: () => ({
      news: [],
   }),

   async created() {
      const news = await ky.get('/news/archives').json();
      this.news = news;
   },
};
</script>

<template>
   <div class="global-page">
      <SiteHeader />

      <h1 class="title">News Archives</h1>

      <section class="news">
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
</template>

<style lang="scss" scoped>
@import '../variables.scss';

.title {
   margin-top: 20px;
}

.news {
   height: 100px;
   width: 60%;
   margin-top: 20px;

   .article {
      height: 180px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border: 2px solid $dark;
      cursor: pointer;
      &.blue { background: linear-gradient(aquamarine, blue); }
      &.red { background: linear-gradient(orange, red); }
      &.green { background: linear-gradient(yellow, limegreen) }
      &:not(:last-child) { margin-bottom: 30px; }
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
</style>
