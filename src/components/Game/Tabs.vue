<script>
export default {
   name: 'tabs',

   props: {
      list: { type: Array, required: true }, // { label: Any, longLabel: String, value: String }
      selected: { type: String, required: true },
      vertical: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['tabs-container', { vertical }]">
      <div
         v-for="tab in list"
         :key="tab.value"
         :class="['tab', { selected: selected === tab.value, vertical }]"
         @click="$emit('click', tab)"
      >
         {{ tab.label }}
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

.tabs-container {
   height: 30px;
   width: 100%;
   background: $dark;
   display: flex;
   &.vertical {
      height: 100%;
      width: 30px;
      flex-direction: column;
   }

   .tab {
      height: 100%;
      background: $dark;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover { background: $dark-hover; }
      &.selected {
         background: $light-dark;
         color: turquoise;
      }
      &.vertical {
         height: 30px;
         width: 30px;
         flex: none;
      }
   }
}
</style>
