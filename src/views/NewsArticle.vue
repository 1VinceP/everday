<script>
import ky from 'ky';
import SiteHeader from '@/components/SiteHeader.vue';

export default {
   name: 'news-article',

   components: { SiteHeader },

   data: () => ({
      article: {},
   }),

   async created() {
      const articleId = this.$route.params.articleId;
      const article = await ky.get(`/news/${articleId}`).json();
      this.article = article;
   },
};
</script>

<template>
   <div class="global-page">
      <SiteHeader />

      <article>
         <span class="title">{{ article.title }}</span>

         <div class="hero">
            <img v-if="article.image" :src="article.image" />
            <div v-else :class="article.color" />
         </div>

         <div class="content">
            <p
               v-for="(paragraph, i) in article.content"
               :key="i"
               class="paragraph"
            >
               {{ paragraph }}
            </p>
         </div>
      </article>
   </div>
</template>

<style lang="scss" scoped>
article {
   width: 60%;
   display: flex;
   flex-direction: column;

   .title {
      margin-top: 20px;
      font-size: 40px;
   }

   .hero {
      height: 300px;
      width: 100%;
      margin: 20px 0px;

      div {
         height: 100%;
         width: 100%;
         &.blue { background: linear-gradient(aquamarine, blue); }
         &.red { background: linear-gradient(orange, red); }
         &.green { background: linear-gradient(yellow, limegreen) }
      }
   }

   .content {
      width: 100%;

      p {
         margin-bottom: 20px;
         text-align: left;
      }
   }
}
</style>
