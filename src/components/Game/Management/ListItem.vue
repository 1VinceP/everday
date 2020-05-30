<script>
export default {
   name: 'list-item',

   props: {
      item: { type: Object, required: true },
   },
};
</script>

<template>
   <div class="item">
      <span class="title">{{ item.name }}</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.item {
   height: 100px;
   width: 100%;
   transition: background-color .15s ease-in-out;
   &:hover { background: $dark-hover; }
   &:active { border: 1px solid $light-dark; }

   .title {
      width: 100%;
      display: flex;
      padding: 10px;
   }
}
</style>
