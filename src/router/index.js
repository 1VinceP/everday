import Vue from 'vue';
import VueRouter from 'vue-router';
import ky from 'ky';
import store from '@/store';
import EmptyRouterView from '@/components/EmptyRouterView.vue';

import Landing from '@/views/Landing.vue';
import News from '@/views/News.vue';
import NewsArticle from '@/views/NewsArticle.vue';
import Account from '@/views/Account.vue';

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: { open: true },
      beforeEnter: async (to, from, next) => {
         // route user to /account if they have a session active
         if (store.state.user.id) {
            // quick route if user is stored on vuex
            next('/account');
         } else {
            next();
            // check if user is on session
            const response = await ky.get('/auth/checkSession').json();
            if (response.onSession) {
               // retrieve user before route
               const user = await ky.get(`/users/${response.userId}`).json();
               store.commit('setStore', { user });
               next('/account');
            } else {
               next();
            }
         }
      },
   },
   {
      path: '/Account',
      name: 'Account',
      component: Account,
   },
   {
      path: '/news',
      component: EmptyRouterView,
      children: [
         {
            path: '',
            name: 'News',
            component: News,
            meta: { open: true },
         },
         {
            path: ':articleId',
            name: 'News Article',
            component: NewsArticle,
            meta: { open: true },
         },
      ],
   },
   {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
   },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

router.beforeEach((to, from, next) => {
   const { state: { user } } = store;

   if (to.meta.open) {
      next();
   } else if (!user.id) {
      next('/');
   } else {
      next();
   }
});

export default router;
