<template>
   <div id="app">
      <!-- <div id="nav">
         <router-link to="/">Home</router-link> |
         <router-link to="/about">About</router-link>
      </div> -->
      <router-view/>
   </div>
</template>

<style lang="scss">
@import './variables.scss';

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

#nav {
   padding: 30px;

   a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
         color: #42b983;
      }
   }
}

.global-page {
   min-height: 100vh;
   width: 100%;
   background: $dark;
   padding: 0px 14px;
   display: flex;
   flex-direction: column;
   align-items: center;
   color: white;

   &.game {
      height: 100vh;
      max-height: 100vh;
      padding: 0px;
   }
}

.global-game {
   background: $dark;
   display: flex;
   flex-direction: column;
   align-items: center;
   color: white;
}
</style>
