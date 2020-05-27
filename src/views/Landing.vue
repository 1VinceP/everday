<script>
import ky from 'ky';
import { mapMutations, mapState } from 'vuex';
import SiteHeader from '@/components/SiteHeader.vue';

export default {
   name: 'landing',

   components: { SiteHeader },

   data: () => ({
      username: '',
      email: '',
      password: '',
      loggingIn: false,
      errorMessage: '',
   }),

   computed: {
      ...mapState(['user']),
   },

   methods: {
      ...mapMutations(['setStore']),

      async createAccount() {
         const { username, email, password } = this;
         const json = { username, email, password };
         this.logginIn = true;
         try {
            const user = await ky.post('/auth/create', { json }).json();
            this.loggingIn = false;
            this.setStore({ user });
            this.$router.push('/account');
         } catch (error) {
            // this.loggingIn = false;
            console.log(error);
         }
      },

      async login() {
         const json = { username: this.username, password: this.password };
         this.loggingIn = true;
         try {
            const user = await ky.post('/auth/login', { json }).json();
            this.loggingIn = false;
            this.setStore({ user });
            this.$router.push('/account');
         } catch (error) {
            this.loggingIn = false;
            this.errorMessage = 'Username or password is incorrect';
         }
      },

      handleEnter(e) {
         if (e.key === 'Enter') {
            this.login();
         }
      },
   },

   watch: {
      username() { this.errorMessage = ''; },
      password() { this.errorMessage = ''; },
   },
};
</script>

<template>
   <div class="global-page">
      <SiteHeader />

      <div class="landing">
         <div class="display">

         </div>

         <div class="login-container">
            Login
            <input v-model="username" placeholder="username" />
            <input v-model="email" placeholder="email" />
            <input v-model="password" @keypress="handleEnter" placeholder="password" />
            <button @click="createAccount">Sign Up</button>
            <button @click="login" :disabled="loggingIn || !username || !password">Login</button>
            <div class="error-message" v-show="errorMessage">{{ errorMessage }}</div>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../variables.scss';

header {
   height: 30px;
   width: 100%;
   display: flex;
   justify-content: space-between;
}

.landing {
   height: $page-height;
   width: 100%;
   display: flex;

   .display {
      height: 100%;
      width: calc(100% - 250px);
   }

   .login-container {
      height: 100%;
      width: 250px;
      display: flex;
      flex-direction: column;
      border: 1px solid white;
      padding: 20px;

      .error-message {
         color: red;
      }
   }
}
</style>
