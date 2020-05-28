<script>
export default {
   name: 'game-loader',

   props: {
      percent: { type: Number },
   },
};
</script>

<template>
   <div class="global-page game-loader">
      <h1 class="title">Everday</h1>

      <div class="loader-container">
         <div class="loader" />
         <span>Loading Game Data... {{ percent }}%</span>
      </div>

      <span />
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

@keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}

.game-loader {
   height: 100vh;
   justify-content: space-around;
   align-items: center;

   .title {
      font-size: 40px;
      font-style: italic;
   }

   .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
   }

   .loader {
      height: 100px;
      width: 100px;
      background: transparent;
      margin-bottom: 20px;
      border: 4px solid $light-dark;
      border-top: 4px solid turquoise;
      border-radius: 50%;
      animation: spin 1500ms linear infinite;
   }
}
</style>
