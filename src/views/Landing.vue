<script>
import { mapMutations, mapState } from 'vuex';
import ky from 'ky';
import PasswordValidator from 'password-validator';
import emailValidator from 'email-validator';
import SiteHeader from '@/components/SiteHeader.vue';

export default {
   name: 'landing',

   components: { SiteHeader },

   data: () => ({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      loggingIn: false,
      errorMessage: '',
   }),

   computed: {
      ...mapState(['user']),
   },

   methods: {
      ...mapMutations(['setStore']),

      async createAccount() {
         const {
            username, email, password, passwordConfirmation,
         } = this;
         const json = {
            username, email, password, passwordConfirmation,
         };

         /* eslint-disable newline-per-chained-call */
         const validator = new PasswordValidator();
         validator.is().min(8)
            .has().lowercase()
            .has().uppercase()
            .has().digits()
            .has().not().spaces();
         /* eslint-enable newline-per-chained-call */

         if (!emailValidator.validate(this.email)) {
            this.errorMessage = 'Email is not valid.';
            return;
         }

         if (!validator.validate(this.password)) {
            this.errorMessage = 'Password does not meet the requirements.';
            return;
         }

         if (this.password !== this.passwordConfirmation) {
            this.errorMessage = 'Passwords do not match.';
            return;
         }

         if (username && email && password && passwordConfirmation) {
            this.loggingIn = true;
            try {
               const user = await ky.post('/auth/create', { json }).json();
               this.loggingIn = false;
               this.setStore({ user });
               this.$router.push('/account');
            } catch (error) {
               // this.loggingIn = false;
               console.log(error);
            }
         }
      },

      async login() {
         const { username, password } = this;
         const json = { username, password };

         if (username && password) {
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
            <input v-model="username" @keypress="handleEnter" placeholder="username" />
            <input v-model="email" @keypress="handleEnter" placeholder="email" />
            <input
               v-model="password"
               @keypress="handleEnter"
               type="password"
               placeholder="password"
            />
            <input
               v-model="passwordConfirmation"
               @keypress="handleEnter"
               type="password"
               placeholder="Confirm Password"
            />
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
