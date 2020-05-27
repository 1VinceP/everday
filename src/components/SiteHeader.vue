<script>
import { mapMutations } from 'vuex';
import ky from 'ky';

export default {
   name: 'site-header',

   methods: {
      ...mapMutations(['resetStore']),

      async logout() {
         const response = await ky.post('/auth/logout');
         if (response.status === 200) {
            this.resetStore();
            this.$router.push('/');
         } else {
            // TODO: remove alert
            // eslint-disable-next-line no-alert
            window.alert('Something went wrong, please try again.');
         }
      },
   },
};
</script>

<template>
   <header>
      <div class="left" @click="$router.push('/')">
         Everday
      </div>
      <div class="right">
         <router-link to="/account"><button>Play</button></router-link>
         <router-link to="/news"><button>News</button></router-link>
         <button>Wiki</button>
         <button>Help</button>
         <button>Store</button>
         <button @click="logout">Logout</button>
      </div>
   </header>
</template>

<style lang="scss" scoped>
@import '../variables.scss';

header {
   height: $header-height;
   width: 100%;
   display: flex;
   justify-content: space-between;
   padding: 0px 20px;

   .left {
      height: 100%;
      flex: 2;
      display: flex;
      align-items: center;
   }

   .right {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
}
</style>
