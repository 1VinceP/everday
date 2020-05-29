<script>
export default {
   name: 'galaxy-tile',

   props: {
      data: {
         type: Object,
         shape: () => ({
            coords: Object,
            system: Object,
            fleets: Array,
         }),
         required: true,
      },
   },
};
</script>

<template>
   <div :class="['tile', { selected: data.selected }]" @click="$emit('click', data)">
   </div>
</template>

<style lang="scss" scoped>
.tile {
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 5px;
   &.selected { border: 1px solid green; }
   &:hover {
      border: 1px solid white;
      &.selected { border: 1px solid lime; }
   }
}
</style>
