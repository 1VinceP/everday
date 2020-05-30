<script>
export default {
   name: 'action-collection-item',

   props: {
      item: { type: Object, required: true },
   },
};
</script>

<template>
   <div class="collection-item" @click="$emit('click', item)">
      <span class="title">{{ item.name }}</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.collection-item {
   height: 120px;
   width: 100%;
   display: flex;
   flex-direction: column;
   transition: background-color .15s ease-in-out;
   &:hover { background: $dark-hover; }
   &:active { border: 1px solid $light-dark; }

   .title {
      width: 100%;
      display: flex;
      padding: 20px;
      font-size: 16px;
   }
}
</style>
