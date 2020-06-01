<script>
import { mapState, mapGetters } from 'vuex';
import startCase from 'lodash/startCase';
import ListItem from './ListItem.vue';

export default {
   name: 'management-view',

   components: { ListItem },

   computed: {
      ...mapState('gameData', ['managementTab']),
      ...mapGetters('gameData', ['managementItems']),

      title() { return startCase(this.managementTab); },
   },

   methods: {
   },
};
</script>

<template>
   <div class="management-view">
      <span class="title">{{ title }}</span>
      <ListItem
         v-for="item in managementItems"
         :key="item.id"
         :system="item"
         :height="80"
      />
   </div>
</template>

<style lang="scss" scoped>
.management-view {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.title {
   width: 100%;
   padding: 5px;
   font-size: 20px;
}
</style>
