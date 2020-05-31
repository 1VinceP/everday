<script>
import startCase from 'lodash/startCase';

export default {
   name: 'list-item',

   computed: {
      title() { return startCase(this.item.name); },

      style() {
         return {
            height: this.height === 'auto' ? 'auto' : `${this.height}px`,
         };
      },
   },

   props: {
      item: { type: Object, required: true },
      height: { type: Number, default: 100 },
   },
};
</script>

<template>
   <div class="item" :style="style">
      <span class="title">{{ title }}</span>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../variables.scss';

.item {
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
